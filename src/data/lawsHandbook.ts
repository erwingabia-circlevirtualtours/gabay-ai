import { HandbookModule, HelplineItem } from "../types";

export const childProtectionHandbook: HandbookModule[] = [
  {
    id: "ra-7610",
    title: "RA 7610: Proteksyon Laban sa Pang-aabuso",
    shortTitle: "Pang-aabuso & Exploitation",
    tagline: "Ang iyong panangga laban sa anumang uri ng pananakit, exploitation, at diskriminasyon.",
    lawAnchor: "Republic Act No. 7610",
    iconName: "Shield",
    colorTheme: "sage",
    questions: [
      {
        question: "Ano ba talaga ang Republic Act No. 7610?",
        answer: "Republic Act No. 7610 is a historic 1992 law designed to be the ultimate shield for children (everyone below 18 years old). It declares that child abuse, child trafficking, forcing children into dangerous labor, prostitution, and discrimination are heavy crimes.",
        taglishAnswer: "Ito ang batas na ipinasa noong 1992 para maging matibay na shield ng bawat menor de edad. Ipinagbabawal nito ang pisikal na pananakit, pang-aabuso, child trafficking, mahihirap na trabaho para sa bata, at anumang uri ng diskriminasyon.",
        lawReference: "Republic Act No. 7610 (Special Protection Against Child Abuse, Exploitation, and Discrimination Act)",
        scenario: "Kung may isang matanda o mas nakakatanda na pinipilit kang gumawa ng mga bagay na labas sa iyong kalooban o sinasaktan ka physically."
      },
      {
        question: "Sino-sino ang tinuturing na 'child' o bata rito?",
        answer: "Under the law, any individual who is below 18 years old is carefully protected as a child. It also covers those over 18 who cannot fully defend or take care of themselves due to physical or mental conditions.",
        taglishAnswer: "Lahat ng taong may edad na 17 pababa (below 18 years old) ay legal na tinuturing na bata at protektado ng batas na ito. Protektado rin dito ang mga lampas 18 na may kapansanan o hindi kayang alagaan ang sarili.",
        lawReference: "Republic Act No. 7610, Section 3"
      },
      {
        question: "Ano ang ginagawa ng batas kapag may kaso ng pang-aabuso?",
        answer: "RA 7610 provides concrete structural mechanisms for immediate crisis intervention. It directs social workers (like DSWD) and the police to pull the child out of harm's way and provide counseling, shelter, and legal assistance.",
        taglishAnswer: "May mga 'crisis intervention plan' kung saan sasagipin ka agad ng mga social workers (tulad ng DSWD) o mga awtoridad para ilayo sa masamang sitwasyon. Bibigyan ka rin ng safe na titirhan at counseling para matulungan kang makabangon.",
        lawReference: "RA 7610 - Structural mechanisms for crisis intervention and reporting"
      }
    ]
  },
  {
    id: "deped-40",
    title: "DepEd Order No. 40: Ligtas na Paaralan",
    shortTitle: "Child Protection Policy sa School",
    tagline: "Zero-tolerance laban sa pananakit at bullying sa loob ng paaralan.",
    lawAnchor: "DepEd Order No. 40, s. 2012",
    iconName: "Home",
    colorTheme: "teal",
    questions: [
      {
        question: "Ano ang 'Child Protection Policy' ng DepEd?",
        answer: "DepEd Order No. 40, s. 2012 mandates a strict zero-tolerance policy against any act of child abuse, exploitation, violence, discrimination, and bullying inside kindergarten, elementary, and secondary schools.",
        taglishAnswer: "Ito ang polisiya ng Department of Education na nagsasabing bawal na bawal ('zero-tolerance') ang pananakit, bullying, diskriminasyon, at pang-aabuso sa loob ng paaralan. Ang school ay dapat maging isang masayang safe space para sa iyo.",
        lawReference: "DepEd Order No. 40, s. 2012",
        scenario: "Kung nakaranas ka ng panunukso ng kaklase, o kung may guro na labis ang galit sa eskwelahan, ang batas na ito ang magtatanggol sa iyo."
      },
      {
        question: "Ano ang 'Positive Discipline' at bawal ba ang mamalo ang teacher?",
        answer: "Yes, corporal punishment is strictly prohibited. Positive discipline means teachers must use non-violent, constructive, and respectful approaches to manage classroom behavior instead of hitting, shouting, or humiliating students.",
        taglishAnswer: "Opo, bawal na bawal ang mamalo, mamahiya, o manigaw ng estudyante (tinatawag itong corporal punishment). Ang dapat gamitin ay 'Positive Discipline'—isang paraan ng paggabay kung saan magalang at mahinahon na itinutuwid ang pagkakamali ng bata nang walang pananakit.",
        lawReference: "DepEd Order No. 40, s. 2012 - Positive Discipline"
      },
      {
        question: "Ano ang 'School Child Protection Committee' (CPC)?",
        answer: "Every school is strictly required to establish a CPC composed of the principal, guidance counselor, teachers, parents, and student representatives to systematically handle disclosures or complaints of abuse and bullying.",
        taglishAnswer: "Bawat paaralan ay may Child Protection Committee o CPC. Binubo ito ng Principal, Guidance Counselor, mga guro, magulang, at student representatives. Sila ang in-charge na makinig at tumulong kapag may estudyanteng nakakaranas ng bullying o pang-aabuso.",
        lawReference: "DepEd Order No. 40, s. 2012 - CPC Establishment"
      }
    ]
  },
  {
    id: "ra-10627",
    title: "RA 10627: Anti-Bullying Act of 2013",
    shortTitle: "Anti-Bullying Act",
    tagline: "Pag-iwas at paglutas sa physical, verbal, social, at online bullying.",
    lawAnchor: "Republic Act No. 10627",
    iconName: "Brain",
    colorTheme: "amber",
    questions: [
      {
        question: "Ano-anong klase ng bullying ang pinagbabawal ng batas?",
        answer: "The Anti-Bullying Act of 2013 specifically covers four main types: physical bullying (hitting, pushing), verbal bullying (teasing, name-calling), social bullying (excluding, spreading rumors), and cyberbullying (online harassment) within or near school grounds.",
        taglishAnswer: "Apat na uri ng bullying ang binabantayan nito: physical (pananakit), verbal (panunukso o pang-aasar), social (pagkalat ng tsismis o sadyang pag-exclude), at cyberbullying (pambu-bully gamit ang Facebook, TikTok, o Messenger). Kahit sa labas o katabi lang ng school grounds nangyari, sakop pa rin ito!",
        lawReference: "Republic Act No. 10627 (Anti-Bullying Act of 2013)",
        scenario: "Kung pinagkakaisahan ka ng mga kaklase sa chat sa Messenger o kaya ay inaabangan ka sa labas ng gate para asarin."
      },
      {
        question: "Paano ko i-report kapag may nag-bully sa akin?",
        answer: "The official DepEd report flow is simple and secure: [Report of Incident] -> [School Guidance Counselor] -> [Principal / School CPC Chair] -> [Local Social Welfare Office & Partners].",
        taglishAnswer: "Simple lang ang daan: Una, sabihin mo sa iyong pinagkakatiwalaang titser o direkta sa iyong School Guidance Counselor. Sila ay makikipag-ugnayan sa Principal (CPC Chair) para kausapin ang pamilya at maayos ang sitwasyon sa tulong ng local social welfare office.",
        lawReference: "DepEd Order No. 40, s. 2012 Action Flow"
      }
    ]
  },
  {
    id: "ra-9344",
    title: "RA 9344: Juvenile Justice & Welfare Act",
    shortTitle: "Juvenile Justice System",
    tagline: "Isang makatao at sensitibong sistema ng hustisya para sa mga kabataan.",
    lawAnchor: "Republic Act No. 9344 (amended by RA 10630)",
    iconName: "Users",
    colorTheme: "sage",
    questions: [
      {
        question: "Ilang taon ang 'minimum age of criminal responsibility' sa Pilipinas?",
        answer: "The minimum age of criminal responsibility is strictly set at 15 years old. This means children aged 15 and below are completely exempt from criminal liability.",
        taglishAnswer: "Ang minimum age ng criminal responsibility sa Pilipinas ay 15 years old. Ibig sabihin, ang mga batang may edad 15 pababa ay libre sa criminal liability at hindi pwedeng ikulong sa normal na bilangguan. Sa halip, sila ay tinutulungan sa mas mabuting paraan.",
        lawReference: "Republic Act No. 9344, amended by RA 10630",
        scenario: "Kung may menor de edad na nakagawa ng mali dahil udyok ng masamang barkada o dahil napilitan."
      },
      {
        question: "Ano ang ibig sabihin ng CICL o 'Children in Conflict with the Law'?",
        answer: "CICL refers to minors (15 and below, or up to 17 acting without discernment) who are accused or found to have committed an offense. Instead of jail, they are diverted to community-based intervention or warm rehabilitation facilities.",
        taglishAnswer: "Ang CICL ay mga menor de edad (15 pababa, o hanggang 17 na gumawa ng pagkakamali nang walang sapat na pag-iisip o discernment) na nakagawa ng paglabag sa batas. Sa halip na parusahan gaya ng matatanda, sila ay dinadala sa community-based intervention o rehabilitation centers para matulungang magbagong-buhay.",
        lawReference: "RA 9344 - Children in Conflict with the Law (CICL)"
      },
      {
        question: "Ano naman ang CAR o 'Children at Risk'?",
        answer: "CAR are minors who are highly vulnerable to committing crimes due to neglect, abuse, extreme poverty, exploitation, or bad environment. They are given preemptive social services to guide them safely.",
        taglishAnswer: "Ang CAR naman ay mga batang nanganib (vulnerable) na magkasala dahil sila ay napabayaan, inabuso, nakatira sa gulo, o walang pamilya. Sila ay tinutulungan ng gobyerno bago pa man sila makagawa ng pagkakamali sa pamamagitan ng social services.",
        lawReference: "RA 9344 - Children at Risk (CAR)"
      }
    ]
  },
  {
    id: "ra-9231",
    title: "RA 9231: Pagpigil sa Worst Forms of Child Labor",
    shortTitle: "Bawal ang Child Labor",
    tagline: "Ipagbawal ang mabibigat at mapanganib na trabaho para sa kabataan.",
    lawAnchor: "Republic Act No. 9231",
    iconName: "Briefcase",
    colorTheme: "terracotta",
    questions: [
      {
        question: "Ano ang pinagbabawal ng Anti-Child Labor Law?",
        answer: "Republic Act No. 9231 strictly prohibits minors (under 18) from engaging in dangerous, exploitative, hazardous, or unhealthy work environments that interfere with their school, moral, or psychological development.",
        taglishAnswer: "Mahigpit na ipinagbabawal ng batas na ito na magtrabaho ang sinumang bata (under 18) sa mga mapanganib, nakakasira sa kalusugan, o mapagsamantalang trabaho (tulad ng pagbubuhat ng sobrang bigat, paghawak ng kemikal, o pagtatrabaho sa gabi) na humahadlang sa pag-aaral o paglaki.",
        lawReference: "Republic Act No. 9231 (Elimination of the Worst Forms of Child Labor)",
        scenario: "Kung pinatitigil ka sa pag-aaral para pagtrabahuhin sa isang mapanganib na quarry, factory, o sakahan sa buong araw."
      }
    ]
  },
  {
    id: "ra-10821",
    title: "RA 10821: Proteksyon sa Emergency (CEPC)",
    shortTitle: "Disaster & Emergency Protection",
    tagline: "Priyoridad ang mga bata tuwing may bagyo, lindol, o krisis.",
    lawAnchor: "Republic Act No. 10821",
    iconName: "AlertTriangle",
    colorTheme: "amber",
    questions: [
      {
        question: "Ano ang gagawin kapag may bagyo, giyera, o kalamidad sa mga bata?",
        answer: "Under the Comprehensive Emergency Program for Children (CEPC), local government units must prioritize kids during disasters. They are commanded to build child-friendly spaces, safeguard separated minors, and provide immediate educational and psychosocial resources.",
        taglishAnswer: "Kapag may sakuna, bagyo, digmaan, o health crisis, ang mga bata ang number one priority! Ang mga lokal na opisyal (barangay/city) ay inuutusang gumawa ng 'child-friendly spaces' sa evacuation centers, gabayan ang mga batang nawalay sa magulang, at magbigay agad ng tulong sa pag-aaral at counseling.",
        lawReference: "Republic Act No. 10821 (Comprehensive Emergency Program for Children)"
      }
    ]
  }
];

export const emergencyHelplines: HelplineItem[] = [
  {
    name: "DepEd Learner Rights & Child Protection Desk",
    hotline: "1555",
    alternativeContact: "(02) 8632-1372",
    email: "cpu@deped.gov.ph",
    agency: "Department of Education",
    description: "Sila ang opisyal na tagapagtanggol mo sa loob ng paaralan laban sa bullying, pananakit ng guro, o kaklase. Pwede kang tumawag o mag-email kahit anong oras!"
  },
  {
    name: "DSWD Care Helpline",
    hotline: "16544",
    alternativeContact: "(02) 8931-8101 to 8107",
    agency: "Department of Social Welfare & Development",
    description: "Ang pangunahing ahensya ng gobyerno para sa kapakanan ng mga bata. Tumutulong sila sa mga batang pinabayaan, nakaranas ng pang-aabuso sa bahay, o nangangailangan ng ligtas na masisilungan."
  },
  {
    name: "Bantay Bata 163",
    hotline: "163",
    agency: "Bantay Bata (ABS-CBN Foundation)",
    description: "Isang maaasahang tawagan para sa child protection. Handang makinig, mag-rescue, at magbigay ng kailangang psychosocial at medikal na tulong para sa mga bata."
  },
  {
    name: "Barangay Council for the Protection of Children (BCPC)",
    hotline: "Puntahan sa inyong Barangay Hall",
    agency: "Lokal na Pamahalaan (Barangay)",
    description: "Ang pinakamalapit na frontline protector mo sa iyong komunidad. Kung may gulo sa bahay o kapitbahay, pumunta lang sa barangay hall para humingi ng temporary shelter at tulong."
  },
  {
    name: "Pambansang Emergency Hotline",
    hotline: "911",
    agency: "Philippine National Police / BFP",
    description: "Para sa mabilisang saklolong medikal o kapulisan kapag ikaw o ang iyong mga kaibigan ay nasa ilalim ng agarang panganib o may emergency."
  }
];
