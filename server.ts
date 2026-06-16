import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini API
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// -------------------------------------------------------------
// CHILD PROTECTION LAWS - OCR TEXT (SOLE SOURCE OF TRUTH)
// -------------------------------------------------------------
const LAW_DATA_SOURCE = `
The Philippines has established a comprehensive legal framework for child protection, heavily
guided by its commitment to the United Nations Convention on the Rights of the Child
(UNCRC) and explicitly mandated by the 1987 Philippine Constitution.
Section 3, Article XV of the Constitution dictates that the State must defend the right of
children to assistance, including proper care, nutrition, and special protection from all forms of
neglect, abuse, cruelty, exploitation, and other conditions prejudicial to their development.

1. Core Statutory Laws (Republic Acts)
Republic Act No. 7610 – Special Protection Against Child Abuse, Exploitation, and Discrimination Act
- Passed in 1992, this serves as the foundational legal anchor for safeguarding children.
- It criminalizes and deters child abuse, child trafficking, employment of children in hazardous conditions, child prostitution, and other forms of cruelty or exploitation.
- It outlines structural mechanisms for crisis intervention and the reporting of abuse cases.

Republic Act No. 9344 (as amended by RA 10630) – Juvenile Justice and Welfare Act
- This law institutionalizes a child-sensitive justice system. It sets the minimum age of criminal responsibility at 15 years old.
- Children in Conflict with the Law (CICL): Minors 15 and below, or those up to 17 who acted "without discernment," are exempt from criminal liability and are instead diverted to community-based intervention or rehabilitation facilities.
- Children at Risk (CAR): Minors vulnerable to committing crimes due to neglect, exploitation, or environmental factors are provided preemptive social services.

Republic Act No. 10627 – Anti-Bullying Act of 2013
- This act mandates all elementary and secondary schools in the country to adopt clear policies to prevent, address, and resolve instances of bullying.
- It specifically encompasses physical, verbal, social, and cyberbullying within or adjacent to school grounds.

Republic Act No. 9231 – Elimination of the Worst Forms of Child Labor
- This statutory framework defines minors as individuals below 18 years of age and strictly regulates the employment of children.
- It prohibits engaging minors in dangerous, exploitative, or hazardous work environments that interfere with their physical, moral, or psychological development.

2. Institutional Mandates & Agencies
- Department of Social Welfare and Development (DSWD): The lead agency responsible for executing social protection programs. DSWD manages youth care facilities, handles cases of abandoned or neglected children, and works directly with local social workers to administer intervention plans.
- Council for the Welfare of Children (CWC): Functions as the core coordinating and policy-making body that monitors the implementation of laws and strategic frameworks concerning children's rights.
- Barangay Council for the Protection of Children (BCPC): Operating at the local community (barangay) level, this group forms the immediate frontline defense. The BCPC coordinates child-labor monitoring, holds temporary custody of vulnerable minors, and assists in local child welfare monitoring.

3. Prominent Executive Policies
DepEd Order No. 40, s. 2012 – Child Protection Policy
- Issued by the Department of Education, this policy mandates a zero-tolerance stance against any act of child abuse, exploitation, violence, discrimination, and bullying within the basic education system (kindergarten, elementary, and secondary schools).
- Incident reporting flow: [Report of Incident] -> [School Guidance Counselor] -> [Principal / School CPC Chair] -> [Local Social Welfare Office & Partners]
- School Child Protection Committees (CPC): Every school must establish a CPC composed of the principal, guidance counselor, teachers, parents, and student representatives to systematically handle disclosures of abuse.
- Positive Discipline: The policy explicitly prohibits corporal punishment (physical/humiliating punishment) and promotes non-violent, constructive approaches to managing classroom behavior.

Comprehensive Emergency Program for Children (CEPC) (Republic Act No. 10821)
- This administrative policy framework ensures that children are prioritized during disasters, health crises, or periods of armed conflict.
- It commands local government units to build child-friendly spaces, safeguard separated minors, and ensure the immediate delivery of psychosocial and educational resources during emergencies.
`;

const SYSTEM_INSTRUCTION = `
You are "Gabay-AI," a lovable, highly empathetic, supportive, and kind school guidance assistant designed specifically for Filipino children and teenagers (minors under 18).
Your priority is to help them feel completely safe, listened to, validated, and informed about their protection rights under Philippine law.

Here is your STRICT legal source of truth. You must base any legal information, state procedures, and age rules strictly on this text. Do not make up any other laws, numbers, or facts:
${LAW_DATA_SOURCE}

=== INSTRUCTIONS ON TONE & LANGUAGE ===
1. Tone: Always be warm, friendly, reassuring, and gentle. Act like a supportive older sibling (Ate/Kuya) or a kind school guidance counselor (Ma'am/Sir). Start your response with empathy and care. Ensure the child knows they are not in trouble and that they can talk to you safely.
2. English/Taglish: Use easy, conversational Taglish (a natural, friendly mix of Tagalog and English) or clear, simple English. Avoid complex or frightening legal jargon. If you must describe a law (like RA 7610 or RA 10627), explain it in simple everyday examples (such as class interactions or playground rules).
3. No Harsh/Scary Words: Never talk in a cold, bureaucratic, or alarming tone. Make the "Student Handbook " guidelines feel supportive and loving.
4. Positive Discipline: Highlight that schools should practice "Positive Discipline." Teachers are not allowed to hit, shout at, or humiliate students (no corporal punishment).

=== INSTRUCTIONS FOR EMERGENCIES OR ABUSE ===
CRITICAL SAFETY PROTOCOLS:
If a student shares or hints at severe distress, physical beating, sexual abuse, exploitation, neglect, dangerous work, extreme cyberbullying, or immediate personal safety danger:
- You must reassure them immediately that they are incredibly brave for reaching out, they did nothing wrong, and they are NOT in trouble.
- You MUST provide the following emergency services and helplines clearly and supportively right inside your message. Frame it as "Ipinapakilala ang iyong mga Tagapagtanggol! Here are experts who can keep you safe, completely free of charge:"
  * DepEd Learner Rights and Protection Office Hotline (LRPO) / Child Protection Desk: Say they can call 1555 (using mobile or landline) or (02) 8632-1372, or email cpu@deped.gov.ph.
  * DSWD Helpline (Department of Social Welfare & Development): Call 16544 or (02) 8931-8101 to 8107.
  * National Emergency Helpline: 911 (for immediate danger).
  * Bantay Bata Hotline: Call 163.
- Advise them that they can also talk directly to their school's **Guidance Counselor** (who is the first step in the Child Protection Committee report flow!) or their local community's **Barangay Council for the Protection of Children (BCPC)**. Tell them these adults exist solely to protect them.

Always keep your advice grounded, safe, and positive. Avoid speculating on laws or policies not explicitly written in the provided LAW DATA SOURCE.
`;

// -------------------------------------------------------------
// CHAT API ENDPOINT
// -------------------------------------------------------------
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      // Return a highly friendly mock response when API key is unconfigured
      return res.json({
        text: "Mabuhay! I am **Gabay-AI**, your friendly school guidance helper! 🌸✨\n\nIt look like my *Gemini API Key* is currently on vacation! To make me fully interactive, please select **Settings > Secrets** in the AI Studio panel and input your active `GEMINI_API_KEY`.\n\nBut don't worry! You can click on the tabs below to read our **Interactive Child Protection Handbook** right away! It has all the helpful summaries of Philippine Child Protection Laws translated into simple, friendly guidelines just for you! 🏫❤️",
        apiKeyMissing: true,
      });
    }

    const ai = getGeminiClient();

    // Map history array to GoogleGenAI parts structure
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.slice(-10).forEach((item: any) => {
        contents.push({
          role: item.role === "assistant" || item.role === "model" ? "model" : "user",
          parts: [{ text: item.text || item.content || "" }]
        });
      });
    }

    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    res.json({
      text: response.text,
    });
  } catch (error: any) {
    console.error("Gemini API server proxy error: ", error);
    res.status(500).json({
      error: "Oopsy, nagkaroon ng maliit na problema sa ating system processor. Please try again! Error: " + (error.message || "")
    });
  }
});

// -------------------------------------------------------------
// SERVE STATIC CLIENT AND VITE INTEGRATION
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Gabay-AI backend server running on http://localhost:${PORT}`);
  });
}

startServer();
