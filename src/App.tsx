import React, { useState, useRef, useEffect } from "react";
import {
  Shield,
  Users,
  Brain,
  AlertTriangle,
  Briefcase,
  Home,
  Search,
  Send,
  Info,
  Phone,
  ShieldCheck,
  Sparkles,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Heart,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Bookmark,
  Share2,
  Check,
  AlertCircle
} from "lucide-react";
import { childProtectionHandbook, emergencyHelplines } from "./data/lawsHandbook";
import { ChatMessage, HandbookQuestion, HandbookModule } from "./types";

export default function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<"handbook" | "chat" | "helplines">("handbook");
  
  // Search and filter states inside the handbook
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLawId, setSelectedLawId] = useState<string>("all");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [languagePreference, setLanguagePreference] = useState<"taglish" | "english">("taglish");

  // Chat interface states
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Mabuhay, kaibigan! Ako si **Gabay**, ang iyong friendly school guidance helper! 😊✨\n\nNandito ako para madali nating pag-usapan ang iyong mga karapatan at kaligtasan sa ilalim ng batas ng Pilipinas. Seryosong usapin, pero gagawin nating simple, magaan, at hindi nakakatakot!\n\nAno ang nais mong itanong ngayon ukol sa bullying, pananakit ng guro, o tungkol sa kaligtasan sa school o sa bahay?",
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [safetyAlertTriggered, setSafetyAlertTriggered] = useState(false);
  
  // Custom interactive quiz states to help minors learn in a fun way!
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll in chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Detector for severe distress / alert keywords to immediately show support and hotlines
  const checkSafetyKeywords = (text: string): boolean => {
    const dangerousWords = [
      "saktan", "pananakit", "palo", "pinapalo", "binubugbog", "bugbugin", "abuso", "abusado", "rape", 
      "hipo", "hinipuan", "hinahawakan", "laslas", "pakamatay", "suicide", "papatayin", "mamatay", 
      "gulo sa bahay", "sinasaktan", "abuse", "severe", "beaten", "nagpakamatay", "maltrato"
    ];
    const lowercaseText = text.toLowerCase();
    return dangerousWords.some((word) => lowercaseText.includes(word));
  };

  // Prepopulate Suggestion chips click
  const handleSuggestionClick = (suggestion: string) => {
    setUserInput(suggestion);
    // Switch to chat tab if from somewhere else
    setActiveTab("chat");
  };

  // Submit chat message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userText = userInput.trim();
    setUserInput("");
    setIsSending(true);

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      role: "user",
      text: userText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);

    // Check safety alert
    const isSafetyTrigger = checkSafetyKeywords(userText);
    if (isSafetyTrigger) {
      setSafetyAlertTriggered(true);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userText,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with proxy");
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: data.text,
        timestamp: new Date(),
        isSafetyAlert: isSafetyTrigger
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      // Fallback elegant client-side answer based on matching keywords
      let fallbackText = "Naku, pasensya na kaibigan. Medyo nahihirapan akong kumonekta sa aking service center sa ngayon. Pero huwag mag-alala! Narito pa rin ako para sa iyo.";
      
      if (userText.toLowerCase().includes("bully")) {
        fallbackText = "Tungkol sa bullying, laging tandaan na sa ilalim ng **Republic Act 10627 (Anti-Bullying Act)**, bawal na bawal ang physical, verbal, social, o cyberbullying sa school o malapit dito. Kung ikaw ay binu-bully o may nakitang binu-bully, sabihin ito agad sa iyong **School Guidance Counselor** o paboritong guro. Safe ka at may karapatan kang matuto nang walang takot!";
      } else if (userText.toLowerCase().includes("palo") || userText.toLowerCase().includes("saktan") || userText.toLowerCase().includes("puro")) {
        fallbackText = "Ayon sa **DepEd Order No. 40, s. 2012**, mahigpit na ipinagbabawal ang corporal punishment o pananakit ng guro o kahit sinong tauhan sa school. Ipinapatupad dito ang **Positive Discipline** kung saan magalang at mahinahon dapat ang pakikipag-usap sa mga estudyante. Kung nasaktan ka o pinahiya, sabihin agad ito sa guidance counselor o sa iyong mga magulang.";
      } else if (isSafetyTrigger) {
        fallbackText = "Narinig kita, at napakatapang mo para ipahayag ito. Tandaan mo na **wala kang ginawang masama at hindi mo kasalanan ito**. Dahil sensitibo ang sitwasyon na ibinahagi mo, narito ang mga eksperto na handang tumulong sa iyo nang libre at walang bayad. \n\n🔒 **Mga Tagapagtanggol Mo:**\n- **DepEd Learner Rights Desk:** Tawagan ang **1555** o mag-email sa cpu@deped.gov.ph.\n- **DSWD Helpline:** Tawagan ang **16544**.\n- **Bantay Bata:** Patuloy na makipag-ugnayan sa **163**.\n- Maaari ka ring pumunta sa inyong local **Barangay Council for the Protection of Children (BCPC)** na matatagpuan sa inyong Barangay Hall para protektahan ka agad.";
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: fallbackText,
        timestamp: new Date(),
        isSafetyAlert: isSafetyTrigger
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsSending(false);
    }
  };

  // Suggestion list
  const suggestionChips = [
    { text: "Bawal ba mamalo o manigaw si Teacher?", icon: HelpCircle },
    { text: "Ano ang masasabi ng batas tungkol sa bully?", icon: Shield },
    { text: "Ilang taon bago makulong ang isang bata?", icon: Users },
    { text: "Anong ginagawa ng Barangay para sa mga bata?", icon: Home },
    { text: "Sino ang matatawagan kapag may emergency?", icon: Phone }
  ];

  // Law icon map helper
  const renderLawIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case "Shield": return <Shield className={className} />;
      case "Users": return <Users className={className} />;
      case "Brain": return <Brain className={className} />;
      case "AlertTriangle": return <AlertTriangle className={className} />;
      case "Briefcase": return <Briefcase className={className} />;
      case "Home": return <Home className={className} />;
      default: return <Info className={className} />;
    }
  };

  // Filtered Laws FAQ
  const filteredHandbook = childProtectionHandbook.map(module => {
    // Check if the overall module matches selected option
    if (selectedLawId !== "all" && module.id !== selectedLawId) {
      return null;
    }

    // Filter questions based on search query
    const matchedQs = module.questions.filter(q => {
      const query = searchQuery.toLowerCase();
      return (
        q.question.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query) ||
        q.taglishAnswer.toLowerCase().includes(query) ||
        q.lawReference.toLowerCase().includes(query) ||
        (q.scenario && q.scenario.toLowerCase().includes(query))
      );
    });

    if (matchedQs.length === 0 && searchQuery !== "") {
      return null;
    }

    return {
      ...module,
      questions: searchQuery === "" ? module.questions : matchedQs
    };
  }).filter((m): m is NonNullable<typeof m> => m !== null);

  // Quick Interactive Quiz Data
  const childQuizData = [
    {
      question: "Binalaan ka ng titser mo na papaluin ka kapag nagkamali ka sa exam. Pinapayagan ba ito ng batas?",
      options: [
        "Opo, para matuto akong magbasa at maging disipulado.",
        "Hindi po! Ayon sa DepEd Order No. 40, s. 2012, bawal ang corporal punishment at dapat 'Positive Discipline' ang ipatupad.",
        "Depende kung pumayag ang aking magulang."
      ],
      correctIndex: 1,
      explanation: "Tama! Ang anumang physical na pamamalo o pananakit ay tinatawag na 'corporal punishment' at bawal sa ating mga eskwelahan. Positive discipline lamang ang pinapayagan."
    },
    {
      question: "Ilang taon ang 'minimum age' kung saan maaari nang singilin ng criminal liability ang isang bata sa Pilipinas?",
      options: [
        "12 years old",
        "18 years old",
        "15 years old"
      ],
      correctIndex: 2,
      explanation: "Ayon sa Juvenile Justice and Welfare Act (RA 9344), ang minimum age ay 15 years old. Ang mga batang 15 at pababa ay exempted sa criminal liability."
    },
    {
      question: "Inaasar ka ng mga kaklase mo tuwing uwian sa inyong group chat sa Messenger. Sakop ba ito ng Anti-Bullying Act?",
      options: [
        "Opo, dahil ito ay sakop ng 'Cyberbullying' kahit sa internet o cellphone ginawa.",
        "Hindi po, dahil sa labas naman ito ng physical classroom.",
        "Hindi po, dahil asaran lang naman ng mga bata."
      ],
      correctIndex: 0,
      explanation: "Eksakto! Ang RA 10627 ay sumasaklaw sa physical, verbal, social, at cyberbullying na may kinalaman o koneksyon sa paaralan at mga estudyante."
    }
  ];

  const handleQuizAnswer = (index: number) => {
    setQuizAnswerSelected(index);
    if (index === childQuizData[currentQuizQuestion].correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setQuizAnswerSelected(null);
    if (currentQuizQuestion < childQuizData.length - 1) {
      setCurrentQuizQuestion(prev => prev + 1);
    } else {
      setShowQuizResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setQuizAnswerSelected(null);
    setShowQuizResult(false);
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#F9F7F2] text-[#2D2926] flex flex-col font-sans selection:bg-[#4A7C59]/20 selection:text-[#2D2926]">
      
      {/* HEADER SECTION - Editorial Aesthetic Styled */}
      <header id="app-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#2D2926]/10 shadow-[0_2px_8px_rgba(45,41,38,0.03)] px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Badge & Name */}
          <div className="flex items-center gap-3">
            <div id="gabay-avatar-badge" className="w-10 h-10 w-10 bg-[#4A7C59] rounded-full flex items-center justify-center text-[#F9F7F2] font-semibold text-lg shadow-sm border border-[#4A7C59]/10">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif italic text-2xl tracking-tight font-bold text-[#2D2926]">Gabay-AI</span>
                <span className="text-[10px] uppercase tracking-widest bg-[#4A7C59]/10 text-[#4A7C59] font-bold px-2 py-0.5 rounded-full">
                  Katuwang Mo
                </span>
              </div>
              <p className="text-[11px] text-[#2D2926]/60 leading-none">Gabay & Proteksyon para sa Batang Pilipino</p>
            </div>
          </div>

          {/* Primary Navigation Tabs */}
          <nav id="main-nav" className="flex flex-wrap gap-2 sm:gap-4 items-center">
            <button
              id="tab-handbook-btn"
              onClick={() => setActiveTab("handbook")}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all rounded ${
                activeTab === "handbook"
                  ? "bg-[#4A7C59] text-[#F9F7F2] shadow-sm"
                  : "text-[#2D2926]/80 hover:text-[#4A7C59] hover:bg-[#4A7C59]/5"
              }`}
            >
              📖 Interactive Handbook
            </button>
            <button
              id="tab-chat-btn"
              onClick={() => setActiveTab("chat")}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all rounded relative ${
                activeTab === "chat"
                  ? "bg-[#4A7C59] text-[#F9F7F2] shadow-sm"
                  : "text-[#2D2926]/80 hover:text-[#4A7C59] hover:bg-[#4A7C59]/5"
              }`}
            >
              💬 Kausapin si Gabay
              {safetyAlertTriggered && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#C84C32] rounded-full animate-pulse border-2 border-white" />
              )}
            </button>
            <button
              id="tab-helplines-btn"
              onClick={() => setActiveTab("helplines")}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all rounded border border-[#C84C32]/30 text-[#C84C32] ${
                activeTab === "helplines"
                  ? "bg-[#C84C32] text-white"
                  : "bg-[#C84C32]/5 hover:bg-[#C84C32]/10"
              }`}
            >
              🚨 Mga Helpline
            </button>
          </nav>
        </div>
      </header>

      {/* EMERGENCY BULWARK ALERTS - Renders whenever distressed text detector runs */}
      {safetyAlertTriggered && (
        <div id="safety-top-sticky" className="bg-[#C84C32] text-[#F9F7F2] px-4 py-3 shadow-[0_4px_12px_rgba(200,76,50,0.2)] border-b border-[#2D2926]/10 animate-fade-in">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base">Nandito kami para sa iyo. Ligtas ka rito.</p>
                <p className="text-xs text-[#F9F7F2]/90">
                  Kung nakakaranas ka ng matinding takot, pananakit sa bahay o eskwelahan, o seryosong gulo, pakiusap, tawagan agad ang mga libreng hotline na ito:
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <a href="tel:1555" className="bg-white text-[#C84C32] px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-white/90 transition-all flex items-center gap-1.5">
                📞 DepEd Desk: 1555
              </a>
              <a href="tel:16544" className="bg-white text-[#C84C32] px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-white/90 transition-all flex items-center gap-1.5">
                📞 DSWD: 16544
              </a>
              <a href="tel:163" className="bg-white text-[#C84C32] px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-white/90 transition-all flex items-center gap-1.5">
                📞 Bantay Bata: 163
              </a>
              <button 
                onClick={() => setSafetyAlertTriggered(false)}
                className="text-xs underline text-white/80 hover:text-white px-2 py-1"
              >
                Itago (X)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CORE FRAME LAYOUT */}
      <main id="app-viewport" className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-[#2D2926]/10 overflow-hidden">
        
        {/* ASIDE LAYOUT - Editorial Left Info panel */}
        <aside id="aside-left" className="w-full lg:w-80 p-6 sm:p-8 flex flex-col gap-6 bg-[#FAF9F6] shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#4A7C59] font-bold block mb-1">
              PAARALAN AT BATAS
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#2D2926] leading-tight mb-2">
              Ang Iyong Karapatan
            </h2>
            <div className="h-1 w-12 bg-[#4A7C59] rounded-full"></div>
          </div>

          <p className="text-sm text-[#2D2926]/75 leading-relaxed">
            Bilang batang Pilipino, protektado ka ng Saligang Batas at mga espesyal na batas (Republic Acts) laban sa anumang uri ng pang-aabuso o bullying.
          </p>

          {/* Quick Law Reference Navigation List */}
          <div id="quick-links-panel" className="space-y-3 mt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#2D2926]/50">Mabilisang Pagbasa:</p>
            {childProtectionHandbook.map((law) => (
              <div 
                key={law.id}
                onClick={() => {
                  setActiveTab("handbook");
                  setSelectedLawId(law.id);
                  setSearchQuery("");
                }}
                className={`group p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedLawId === law.id && activeTab === "handbook"
                    ? "bg-[#4A7C59]/10 border-[#4A7C59]"
                    : "bg-white border-[#2D2926]/10 hover:border-[#4A7C59]/40 hover:bg-[#4A7C59]/5"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`p-1 rounded ${
                    selectedLawId === law.id && activeTab === "handbook"
                      ? "bg-[#4A7C59] text-[#F9F7F2]"
                      : "bg-[#2D2926]/5 text-[#2D2926]/75 group-hover:text-[#4A7C59]"
                  }`}>
                    {renderLawIcon(law.iconName, "w-3.5 h-3.5")}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-[#2D2926]/50">
                    {law.lawAnchor}
                  </span>
                </div>
                <h3 className="font-semibold text-xs text-[#2D2926] group-hover:text-[#4A7C59] transition-colors leading-tight">
                  {law.shortTitle}
                </h3>
              </div>
            ))}
            
            {selectedLawId !== "all" && (
              <button 
                onClick={() => setSelectedLawId("all")}
                className="text-xs text-[#4A7C59] hover:underline font-semibold flex items-center gap-1"
              >
                ← Ipakita lahat ng batas
              </button>
            )}
          </div>

          {/* Clean Editorial Bottom Card Quote */}
          <div id="aside-footer-quote" className="mt-auto p-4 bg-[#4A7C59]/5 rounded-2xl border border-[#4A7C59]/20 shadow-[inset_0_2px_4px_rgba(74,124,89,0.02)]">
            <p className="text-xs font-serif italic text-[#4A7C59] leading-relaxed">
              &ldquo;Ang bawat bata ay may karapatang lumaking ligtas at masaya. Nandito ang Gabay-AI para sa iyo.&rdquo;
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-5 h-5 bg-[#4A7C59] rounded-full flex items-center justify-center text-[10px] text-white">🌸</div>
              <span className="text-[10px] font-semibold text-[#2D2926]/70">Gabay-AI Team</span>
            </div>
          </div>
        </aside>

        {/* MAIN DISPLAY WINDOW */}
        <section id="center-stage" className="flex-1 p-6 sm:p-10 bg-white flex flex-col min-h-0">
          
          {/* Welcome Area */}
          <div className="mb-6 border-l-4 border-[#F3A712] pl-4 sm:pl-6">
            <h1 className="font-serif text-3xl sm:text-5xl leading-tight font-bold tracking-tight text-[#2D2926] mb-1">
              Kamusta ka, kaibigan? ✨
            </h1>
            <p className="text-sm sm:text-lg text-[#2D2926]/75">
              Iwasan natin ang mga takot. Nandito si Gabay para ipaliwanag ang iyong mga karapatan nang simple at magaan.
            </p>
          </div>

          {/* -------------------- TAB 1: INTERACTIVE LEGAL HANDBOOK -------------------- */}
          {activeTab === "handbook" && (
            <div id="handbook-viewport" className="flex-1 flex flex-col gap-6 animate-fade-in">
              
              {/* Search, Filter & Language Header Row */}
              <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#2D2926]/10 flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search input bar */}
                <div className="relative w-full md:w-72">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#2D2926]/40">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    id="handbook-search"
                    type="text"
                    placeholder="Search e.g., bullying, palo, labor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white pl-9 pr-4 py-2 text-sm rounded-lg border border-[#2D2926]/10 focus:outline-none focus:border-[#4A7C59] focus:ring-1 focus:ring-[#4A7C59]/30 transition-all text-[#2D2926]"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 px-1.5 py-0.5 text-xs text-slate-400 hover:text-slate-600 top-1/2 -translate-y-1/2"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Filter and Switch Buttons */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                  
                  {/* Language switch */}
                  <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-[#2D2926]/10">
                    <span className="text-[10px] uppercase font-bold text-[#2D2926]/50 px-1.5">Wika:</span>
                    <button
                      onClick={() => setLanguagePreference("taglish")}
                      className={`px-2 py-1 text-xs font-semibold rounded transition-all ${
                        languagePreference === "taglish"
                          ? "bg-[#4A7C59] text-white"
                          : "text-[#2D2926]/75 hover:bg-slate-100"
                      }`}
                    >
                      🗣️ Taglish
                    </button>
                    <button
                      onClick={() => setLanguagePreference("english")}
                      className={`px-2 py-1 text-xs font-semibold rounded transition-all ${
                        languagePreference === "english"
                          ? "bg-[#4A7C59] text-white"
                          : "text-[#2D2926]/75 hover:bg-slate-100"
                      }`}
                    >
                      🇬🇧 English
                    </button>
                  </div>

                  {/* Active law filter indicator */}
                  {selectedLawId !== "all" && (
                    <span className="bg-[#4A7C59]/10 text-[#4A7C59] px-2 py-1 rounded text-xs font-semibold">
                      Filtered: {childProtectionHandbook.find(x => x.id === selectedLawId)?.shortTitle}
                    </span>
                  )}
                </div>
              </div>

              {/* HANDBOOK SECTIONS RENDER */}
              <div className="flex-1 space-y-6 overflow-y-auto max-h-[500px] pr-2">
                {filteredHandbook.length === 0 ? (
                  <div className="p-12 text-center bg-[#FAF9F6] rounded-2xl border border-dashed border-[#2D2926]/20">
                    <HelpCircle className="w-12 h-12 text-[#2D2926]/30 mx-auto mb-3" />
                    <h3 className="font-bold text-lg">May nagtatago ba sa sulok?</h3>
                    <p className="text-sm text-[#2D2926]/65 mt-1">
                      Wala kaming nakitang sagot sa salitang hinanap mo. Subukang i-search ang mga mas simpleng salita tulad ng &ldquo;bully,&rdquo; &ldquo;palo,&rdquo; o &ldquo;guro.&rdquo;
                    </p>
                    <button 
                      onClick={() => { setSearchQuery(""); setSelectedLawId("all"); }}
                      className="mt-4 px-4 py-2 bg-[#4A7C59] text-white rounded-lg text-xs font-semibold hover:bg-[#396045] transition-all"
                    >
                      Ipakita Muli Lahat ng Batas
                    </button>
                  </div>
                ) : (
                  filteredHandbook.map((module) => (
                    <div 
                      key={module.id} 
                      className="p-5 sm:p-6 bg-[#FAF9F6] rounded-2xl border border-[#2D2926]/10 relative overflow-hidden shadow-sm"
                    >
                      {/* Decorative colored left strip */}
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#4A7C59]"></div>
                      
                      {/* Module Title Banner */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2D2926]/10 pb-3 mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-[#4A7C59]/10 text-[#4A7C59] rounded-lg">
                            {renderLawIcon(module.iconName, "w-5 h-5")}
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#4A7C59]">
                              {module.lawAnchor}
                            </span>
                            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D2926]">
                              {module.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#2D2926]/80 italic mb-4">
                        &ldquo;{module.tagline}&rdquo;
                      </p>

                      {/* Expandable Accordion of QA to avoid scary heavy paragraphs */}
                      <div className="space-y-3">
                        {module.questions.map((q, idx) => {
                          const qKey = `${module.id}-${idx}`;
                          const isExpanded = expandedQuestion === qKey;

                          return (
                            <div 
                              key={idx}
                              className={`rounded-xl border transition-all ${
                                isExpanded 
                                  ? "bg-white border-[#4A7C59]/40 shadow-sm" 
                                  : "bg-[#FAF9F6] border-[#2D2926]/10 hover:border-[#4A7C59]/20"
                              }`}
                            >
                              {/* Accordion header button */}
                              <button
                                onClick={() => setExpandedQuestion(isExpanded ? null : qKey)}
                                className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm"
                              >
                                <span className="text-[#2D2926] hover:text-[#4A7C59] transition-colors">
                                  {q.question}
                                </span>
                                <span>
                                  {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-[#4A7C59]" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-[#2D2926]/50" />
                                  )}
                                </span>
                              </button>

                              {/* Accordion expansion payload */}
                              {isExpanded && (
                                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm border-t border-[#2D2926]/5 space-y-3">
                                  
                                  {/* Emphasized safe statement layout */}
                                  <div className="bg-[#4A7C59]/5 p-3 rounded-lg border-l-4 border-[#4A7C59]/70">
                                    <p className="leading-relaxed whitespace-pre-line text-[#2D2926]">
                                      {languagePreference === "taglish" ? q.taglishAnswer : q.answer}
                                    </p>
                                  </div>

                                  {/* Youth relatable real-life scenario example card */}
                                  {q.scenario && (
                                    <div className="p-3 bg-[#F3A712]/5 rounded-lg border border-[#F3A712]/30 text-[#2D2926]/85">
                                      <span className="font-bold text-[10px] uppercase text-[#F3A712] block mb-1">
                                        💡 HALIMBAWA O SCENARIO:
                                      </span>
                                      <p className="italic text-xs leading-relaxed">
                                        &ldquo;{q.scenario}&rdquo;
                                      </p>
                                    </div>
                                  )}

                                  {/* Legal citation reference for authenticity */}
                                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                                    <span>
                                      📍 Batayan: <strong className="font-medium text-slate-700">{q.lawReference}</strong>
                                    </span>
                                    <button 
                                      onClick={() => handleSuggestionClick(q.question)}
                                      className="text-[#4A7C59] font-bold uppercase tracking-wider text-[9px] hover:underline"
                                    >
                                      💬 Itanong pa kay Gabay
                                    </button>
                                  </div>

                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  ))
                )}
              </div>

              {/* mini fun quiz element card to reinforce safe learning and student agency */}
              <div className="mt-4 p-5 bg-[#F3A712]/10 rounded-2xl border border-[#F3A712]/30">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#F3A712]/20 text-[#2D2926] rounded-xl">
                    <Sparkles className="w-5 h-5 text-[#2D2926]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-lg text-[#2D2926]">
                      Sagutin ang Gabay Quiz! 🎯
                    </h3>
                    <p className="text-xs text-[#2D2926]/80 mb-3">
                      Subukan ang iyong nalalaman tungkol sa child protection laws sa loob ng 3 sandali!
                    </p>

                    {!showQuizResult ? (
                      <div className="space-y-3 bg-white/60 p-4 rounded-xl border border-white/80">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F3A712]/20 px-2 py-0.5 rounded-full text-[#2D2926]">
                          Question {currentQuizQuestion + 1} of {childQuizData.length}
                        </span>
                        
                        <p className="font-semibold text-xs sm:text-sm text-[#2D2926] mt-1">
                          {childQuizData[currentQuizQuestion].question}
                        </p>

                        <div className="space-y-2 mt-2">
                          {childQuizData[currentQuizQuestion].options.map((option, idx) => (
                            <button
                              key={idx}
                              disabled={quizAnswerSelected !== null}
                              onClick={() => handleQuizAnswer(idx)}
                              className={`w-full text-left p-2.5 text-xs rounded-lg border transition-all flex items-center justify-between ${
                                quizAnswerSelected === null
                                  ? "bg-white hover:bg-slate-50 border-slate-200"
                                  : idx === childQuizData[currentQuizQuestion].correctIndex
                                    ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-medium"
                                    : quizAnswerSelected === idx
                                      ? "bg-rose-50 border-rose-300 text-rose-800"
                                      : "bg-white/40 border-slate-100 text-slate-400"
                              }`}
                            >
                              <span>{option}</span>
                              {quizAnswerSelected !== null && idx === childQuizData[currentQuizQuestion].correctIndex && (
                                <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
                              )}
                            </button>
                          ))}
                        </div>

                        {quizAnswerSelected !== null && (
                          <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200 animate-fade-in">
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {childQuizData[currentQuizQuestion].explanation}
                            </p>
                            <button
                              onClick={handleNextQuiz}
                              className="mt-2.5 px-3 py-1 bg-[#4A7C59] text-white text-[11px] font-bold rounded-lg hover:bg-[#396045] transition-all"
                            >
                              {currentQuizQuestion < childQuizData.length - 1 ? "Susunod na Tanong (Next)" : "Tingnan ang Iskor"}
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-white/80 p-5 rounded-xl border border-white text-center">
                        <h4 className="font-bold text-base text-[#4A7C59]">Napakagaling mo! 🌟</h4>
                        <p className="text-xs text-slate-600 mt-1 mb-3">
                          Nakuha mo ang iskor na <strong className="text-[#2D2926] font-bold text-sm">{quizScore} / {childQuizData.length}</strong>!
                        </p>
                        <p className="text-xs text-slate-500 italic max-w-sm mx-auto mb-4">
                          &ldquo;Ang talino mo, kaibigan! Mas alam mo na ngayon kung paano protektahan ang iyong sarili at iyong mga kaibigan.&rdquo;
                        </p>
                        <button
                          onClick={resetQuiz}
                          className="px-4 py-1.5 bg-[#4A7C59] text-white text-xs font-bold rounded-lg hover:bg-[#396045] transition-all"
                        >
                          Ulitin ang Quiz
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* -------------------- TAB 2: GABAY-AI CHAT WINDOW -------------------- */}
          {activeTab === "chat" && (
            <div id="chat-viewport" className="flex-1 flex flex-col min-h-0 animate-fade-in">
              
              {/* suggestion chips bar */}
              <div className="mb-3">
                <p className="text-[10px] uppercase font-bold tracking-wider text-[#2D2926]/50 mb-1.5">
                  Subukang I-click o Itanong Kay Gabay:
                </p>
                <div className="flex flex-wrap gap-1.5 overflow-x-auto max-h-24 py-0.5">
                  {suggestionChips.map((chip, idx) => {
                    const ChipIcon = chip.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(chip.text)}
                        className="text-[11px] text-[#4A7C59] bg-[#4A7C59]/5 hover:bg-[#4A7C59]/10 border border-[#4A7C59]/15 px-2.5 py-1 rounded-full text-left transition-all flex items-center gap-1 shrink-0"
                      >
                        <ChipIcon className="w-3 h-3 text-[#4A7C59]/70 shrink-0" />
                        <span>{chip.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chat Message Scroll viewport */}
              <div className="flex-1 border border-[#2D2926]/10 rounded-2xl bg-[#FAF9F6]/50 overflow-y-auto p-4 space-y-4 mb-4 shadow-inner min-h-[300px] max-h-[420px]">
                {messages.map((message) => {
                  const isUser = message.role === "user";
                  return (
                    <div 
                      key={message.id}
                      className={`flex gap-3 items-start ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      {/* Left AI Avatar */}
                      {!isUser && (
                        <div className="w-8 h-8 rounded-full bg-[#4A7C59] flex-shrink-0 flex items-center justify-center text-[#F9F7F2] text-xs font-bold shadow-sm border border-[#4A7C59]/10 mt-1">
                          G
                        </div>
                      )}

                      {/* Msg bubble element */}
                      <div className={`p-4 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed shadow-sm transition-all whitespace-pre-line ${
                        isUser 
                          ? "bg-[#4A7C59] text-white rounded-tr-none" 
                          : message.isSafetyAlert
                            ? "bg-[#C84C32]/10 border border-[#C84C32] text-[#2D2926] rounded-tl-none border-l-4"
                            : "bg-white text-[#2D2926] border border-[#2D2926]/10 rounded-tl-none"
                      }`}>
                        
                        {/* If is severe safety alert banner inside the chat */}
                        {message.isSafetyAlert && (
                          <div className="mb-2 p-2 bg-[#C84C32]/15 rounded-lg border border-[#C84C32]/30 flex items-center gap-2 text-[#C84C32] font-semibold text-xs">
                            <AlertCircle className="w-4 h-4 shrink-0 text-[#C84C32]" />
                            <span>Ikaw ay ligtas kay Gabay-AI. Wala kang kasalanan.</span>
                          </div>
                        )}

                        <p>{message.text}</p>
                        
                        <div className={`text-[9px] mt-1 text-right ${isUser ? "text-white/70" : "text-slate-400"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      {/* Right User Avatar */}
                      {isUser && (
                        <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#2D2926]/15 flex-shrink-0 flex items-center justify-center text-xs font-bold text-[#2D2926] mt-1 shadow-sm">
                          Yo
                        </div>
                      )}
                    </div>
                  );
                })}

                {isSending && (
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#4A7C59] flex-shrink-0 flex items-center justify-center text-[#F9F7F2] text-xs font-bold animate-pulse">
                      G
                    </div>
                    <div className="bg-white border border-[#2D2926]/10 p-3.5 rounded-2xl rounded-tl-none max-w-[80%] text-xs sm:text-sm text-slate-500 italic shadow-sm">
                      Nagsusulat si Gabay-AI ng tugon... 🌸
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input form container */}
              <form onSubmit={handleSendMessage} className="flex gap-2 items-center bg-[#FAF9F6] p-2 rounded-2xl border border-[#2D2926]/10">
                <input
                  id="chat-input-text"
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Sumulat sa Taglish o English... (e.g. Masama po ba binu-bully ako?)"
                  className="flex-1 bg-transparent px-4 py-2.5 text-xs sm:text-sm text-[#2D2926] focus:outline-none placeholder-slate-400"
                />
                <button
                  id="chat-submit-btn"
                  type="submit"
                  disabled={isSending || !userInput.trim()}
                  className="bg-[#4A7C59] hover:bg-[#396045] disabled:bg-slate-300 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              
              <p className="text-[10px] text-slate-400 text-center mt-2">
                👮🏽‍♂️ Gabay-AI is a supportive assistant strictly grounded on real Philippine laws. In immediate peligro, calling 911 is recommended.
              </p>

            </div>
          )}

          {/* -------------------- TAB 3: HELPLINES VIEW -------------------- */}
          {activeTab === "helplines" && (
            <div id="helplines-viewport" className="flex-1 flex flex-col gap-6 animate-fade-in overflow-y-auto max-h-[550px] pr-2">
              
              <div className="p-4 bg-red-50 rounded-2xl border border-red-200 text-red-900 flex gap-3 items-center">
                <AlertTriangle className="w-6 h-6 text-[#C84C32] shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Huwag matakot humingi ng tulong. Hindi ka nag-iisa.</h4>
                  <p className="text-xs text-red-700 mt-1">
                    Ang mga sumusunod na opisyal at ahensya ay may legal na kapangyarihang protektahan ka sa anumang gulo, pambubugbog, pananakit, o matinding bullying. Sila ay ganap na libreng tawagan.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyHelplines.map((helpline, idx) => (
                  <div key={idx} className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#2D2926]/10 relative group hover:border-[#C84C32]/40 transition-colors">
                    
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C84C32] block mb-1">
                      {helpline.agency}
                    </span>
                    
                    <h3 className="font-serif font-bold text-base text-[#2D2926] mb-2 leading-tight">
                      {helpline.name}
                    </h3>
                    
                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                      {helpline.description}
                    </p>

                    <div className="space-y-1 bg-white p-3 rounded-xl border border-[#2D2926]/5 text-xs">
                      <div className="font-semibold text-[#C84C32] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Hotline / Telepono:</span>
                        <a href={`tel:${helpline.hotline}`} className="hover:underline font-bold text-sm bg-[#C84C32]/5 px-2 py-0.5 rounded text-[#C84C32]">
                          {helpline.hotline}
                        </a>
                      </div>
                      
                      {helpline.alternativeContact && (
                        <div className="text-slate-500 flex items-center gap-1.5">
                          <span className="font-medium">Direct Line:</span>
                          <span className="font-bold text-slate-700">{helpline.alternativeContact}</span>
                        </div>
                      )}
                      
                      {helpline.email && (
                        <div className="text-slate-500 flex items-center gap-1.5 overflow-x-auto">
                          <span className="font-medium">Email:</span>
                          <a href={`mailto:${helpline.email}`} className="text-[#4A7C59] hover:underline font-bold">
                            {helpline.email}
                          </a>
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>

              {/* Informative Step of Abuse Incident Reporting Flow (under DepEd CPP Order 40) */}
              <div className="mt-4 p-5 bg-[#4A7C59]/10 rounded-2xl border border-[#4A7C59]/30">
                <h3 className="font-serif font-bold text-lg text-[#2D2926] mb-2">
                  Ang Opisyal na Daang-Ligtas (Reporting Flow) 🛡️
                </h3>
                <p className="text-xs text-[#2D2926]/80 mb-4">
                  Kapag may pinsala o kasalanang ibinahagi ang batang mag-aaral, ito ang ligtas na hakbang na nire-require ng **DepEd Order No. 40, s. 2012** upang protektahan ang bata:
                </p>

                {/* Vertical Process Steps */}
                <div className="relative border-l border-[#4A7C59]/40 ml-4 pl-6 space-y-4 text-xs sm:text-sm">
                  
                  {/* Step 1 */}
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0 w-4.5 h-4.5 bg-[#4A7C59] rounded-full border-2 border-[#F9F7F2] text-white font-bold text-[9px] flex items-center justify-center">
                      1
                    </span>
                    <h4 className="font-bold text-[#2D2926]">Pagsasabi o Pag-report ng Insidente (Report of Incident)</h4>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Sinasabi ng mag-aaral o witness ang naganap na panunukso, pambu-bully, o pang-aabuso ng kahit sino.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0 w-4.5 h-4.5 bg-[#4A7C59] rounded-full border-2 border-[#F9F7F2] text-white font-bold text-[9px] flex items-center justify-center">
                      2
                    </span>
                    <h4 className="font-bold text-[#2D2926]">School Guidance Counselor</h4>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Kakausapin ka nang mahinahon, marahan, at bibigyan ng safe space nang walang pananakot o panghuhusga.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0 w-4.5 h-4.5 bg-[#4A7C59] rounded-full border-2 border-[#F9F7F2] text-white font-bold text-[9px] flex items-center justify-center">
                      3
                    </span>
                    <h4 className="font-bold text-[#2D2926]">Principal o School CPC Chair</h4>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Ipapatawag ang Child Protection Committee para masusing mapag-aralan ang nararapat na disciplinary actions at suporta.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0 w-4.5 h-4.5 bg-[#C84C32] rounded-full border-2 border-[#F9F7F2] text-white font-bold text-[9px] flex items-center justify-center">
                      4
                    </span>
                    <h4 className="font-bold text-[#2D2926]">Local Social Welfare Office (DSWD) at partners</h4>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Titiyaking may psychosocial counselors na gagabay sa bata at tutulong sa kanyang mental health recovery.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          )}

        </section>

      </main>

      {/* CORE PERSISTENT RED EMERGENCY FOOTER - Perfect fit for Editorial Theme */}
      <footer id="editorial-footer-alert" className="mt-auto bg-[#C84C32] text-white font-sans py-4 sm:py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <span className="bg-white/20 text-white font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded inline-block">
              ⚠️ MGA IMYATANG LINYA NG SAKLOLO (EMERGENCY HOTLINES):
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs font-semibold">
              <span className="flex items-center gap-1">🏢 DSWD: <strong className="text-yellow-200">16544</strong></span>
              <span className="flex items-center gap-1">🏫 DepEd LRPO cpu: <strong className="text-yellow-200">1555</strong></span>
              <span className="flex items-center gap-1">👶 Bantay Bata: <strong className="text-yellow-200">163</strong></span>
              <span className="flex items-center gap-1">🚨 PNP/911: <strong className="text-yellow-200">911</strong></span>
            </div>
          </div>

          <div className="text-right text-[11px] font-serif italic text-white/90">
            Huwag matakot humingi ng tulong. Ligtas ka rito. Gabay-AI is here for your safety.
          </div>
        </div>
      </footer>

    </div>
  );
}
