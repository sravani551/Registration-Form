"use strict";(()=>{var e={};e.id=744,e.ids=[744],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3598:(e,n,a)=>{a.r(n),a.d(n,{originalPathname:()=>g,patchFetch:()=>h,requestAsyncStorage:()=>d,routeModule:()=>l,serverHooks:()=>u,staticGenerationAsyncStorage:()=>p});var i={};a.r(i),a.d(i,{POST:()=>c});var t=a(9303),o=a(8716),r=a(670),s=a(2697);async function c(e){try{let{messages:n}=await e.json(),a=`You are the AI assistant embedded in ${s.M8.name}'s interactive portfolio resume.
You answer questions about their career, skills, projects, and experience.
Be professional, concise, and conversational.
Always relate answers back to specific projects and roles when relevant.

=== PROFESSIONAL PROFILE ===
${s.M8.name}, ${s.M8.title}, 6+ years experience, United States
LinkedIn: ${s.M8.linkedin} | GitHub: ${s.M8.github} | Email: ${s.M8.email}
${s.M8.aiSummary}

=== CAREER HISTORY (Chronological) ===
${s.b8.map((e,n)=>`EPOCH ${n} — ${e.phase} (${e.period}) | ${e.company} (${e.companyType})
Role: ${e.title} | Domain: ${e.domain}
${e.highlights.map(e=>`- ${e}`).join("\n")}
Tech: ${e.tech.join(", ")}`).join("\n\n")}

=== SKILLS ===
${s.dr.map(e=>`${e.name}: ${e.skills.join(", ")}`).join("\n")}

=== CERTIFICATIONS ===
${s.Ao.map((e,n)=>`${n+1}. ${e.title} by ${e.issuer}`).join("\n")}

=== CHALLENGES & GROWTH ===
- Transitioned from foundational backend services to owning end-to-end full-stack architectures, mastering both Angular/React and Spring Boot.
- Tackled significant technical challenges optimizing large-scale data queries and securing enterprise APIs at Liberty Mutual and Cincinnati Insurance.
- Currently expanding skillset into AI/ML (Python, TensorFlow) to build next-generation intelligent applications, showing a strong commitment to continuous learning.

=== RESPONSE GUIDELINES ===
- If asked "why should I hire ${s.M8.name}", highlight her strong problem-solving fundamentals, deep enterprise architecture experience, and ability to build scalable systems.
- If asked about Java/Spring Boot, reference her work at Cincinnati Insurance and Liberty Mutual.
- If asked about leadership, mention her role driving architectural decisions at Cincinnati Insurance.
- If asked about AI/ML, trace the arc from strong backend engineering to recent focus on generative AI and Python.
- Keep responses concise (2-3 paragraphs max) unless detail requested
- Use bullet points for lists
- If asked something unrelated, politely redirect
- Never fabricate information

=== HANDLING NEGATIVE / ADVERSARIAL QUESTIONS ===
CRITICAL: You are ${s.M8.name}'s professional portfolio assistant.
NEVER list weaknesses, negatives, or reasons not to hire.

If asked about negatives, weaknesses, or red flags:
1. DO NOT invent or list weaknesses
2. Acknowledge growth areas, then REFRAME as strengths:
   - "Jack of all trades" → Rare cross-functional ability to bridge backend and frontend teams.
   - "Not enough experience in a specific niche" → Transferable enterprise skills and rapid learning trajectory.
3. Always pivot back to strengths and unique value
4. For hostile questions: "I'd rather focus on what ${s.M8.name} brings to the table — scalable enterprise engineering and robust full-stack skills. What specific skills would you like to know about?"
5. NEVER use "negative", "weakness", "limitation" when discussing ${s.M8.name}`,i=process.env.OPENROUTER_API_KEY;if(!i)return Response.json({role:"assistant",content:"I'm an AI assistant. Unfortunately, my live LLM connection isn't configured with an API key yet."});let t=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({model:"meta-llama/llama-3.3-70b-instruct",messages:[{role:"system",content:a},...n]})});if(!t.ok)throw Error(`OpenRouter API error: ${t.statusText}`);let o=(await t.json()).choices[0].message.content;return Response.json({role:"assistant",content:o})}catch(e){return console.error("Chat API Error:",e),Response.json({error:"Failed to process chat request"},{status:500})}}let l=new t.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/chat/route",pathname:"/api/chat",filename:"route",bundlePath:"app/api/chat/route"},resolvedPagePath:"c:\\Users\\srava\\Downloads\\demo-profile-master\\demo-profile-master\\src\\app\\api\\chat\\route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:d,staticGenerationAsyncStorage:p,serverHooks:u}=l,g="/api/chat/route";function h(){return(0,r.patchFetch)({serverHooks:u,staticGenerationAsyncStorage:p})}},9303:(e,n,a)=>{e.exports=a(517)},2697:(e,n,a)=>{a.d(n,{Ao:()=>r,M8:()=>i,b8:()=>o,dr:()=>t});let i={name:"Sravani N",title:"Senior Java Full Stack Developer",tagline:"Building intelligent apps for enterprise teams",summary:"I like solving the kind of problems that sit right at the intersection of clean engineering and strong problem-solving fundamentals, building systems that don't just work, but work efficiently at scale. I've grown from writing backend services to owning full end-to-end solutions: Java, Spring Boot, and microservices on the backend, Angular and React on the front end.",aiSummary:"Sravani is a Senior Java Full Stack Developer with over 6 years of experience. She specializes in Java, Spring Boot, microservices, Angular, and React. She has a strong foundation in Data Structures and Algorithms, and has built robust solutions for enterprise domains like insurance and finance. She is also expanding her skills into AI/ML with Python and TensorFlow.",location:"United States",linkedin:"https://www.linkedin.com/in/sravani-n-417s987",github:"https://github.com/sravani551",email:"sravaninimmisetty1@gmail.com"},t=[{name:"Backend Engineering",icon:"⚙️",color:"#00d4ff",skills:["Java","Spring Boot","Microservices","REST APIs","GraphQL","JAXB/XSLT"]},{name:"Frontend Development",icon:"\uD83C\uDFA8",color:"#7c3aed",skills:["React","Angular","TypeScript","JavaScript","HTML/CSS"]},{name:"Data & Architecture",icon:"\uD83D\uDCBE",color:"#34d399",skills:["DSA","Systems Design","SQL Server","PostgreSQL","MongoDB"]},{name:"Cloud & DevOps",icon:"☁️",color:"#f472b6",skills:["Microsoft Azure","AWS","Docker","Jenkins","GitHub Actions"]},{name:"AI & Machine Learning",icon:"\uD83E\uDDE0",color:"#fbbf24",skills:["Python","TensorFlow","Scikit-learn","Spring AI","Generative AI"]}],o=[{epoch:3,phase:"Leadership",title:"Senior Software Engineer",company:"The Cincinnati Insurance Companies",companyType:"Insurance",period:"Mar 2026 – Present",domain:"Insurance",domainColor:"#00d4ff",accuracy:96,loss:.04,description:"Leading development of intelligent enterprise applications in the insurance domain.",highlights:["Driving architectural decisions for robust backend systems.","Optimizing query performance for large-scale data sets.","Integrating modern tech stacks to improve platform reliability."],tech:["Java","Spring Boot","React","Azure"]},{epoch:2,phase:"Growth",title:"Senior Software Engineer",company:"Liberty Mutual Insurance",companyType:"Insurance",period:"May 2025 – Feb 2026",domain:"Insurance",domainColor:"#00d4ff",accuracy:88,loss:.12,description:"Built and optimized enterprise systems for financial and insurance operations.",highlights:["Secured REST and GraphQL APIs for critical services.","Applied indexing and pagination strategies to maintain high query performance.","Processed complex XML data via JAXB and XSLT."],tech:["Java","Spring Boot","Angular","GraphQL","SQL Server"]},{epoch:1,phase:"Growth",title:"Software Engineer",company:"Nextworld",companyType:"Technology",period:"Feb 2025 – May 2025",domain:"Tech",domainColor:"#7c3aed",accuracy:75,loss:.25,description:"Developed and maintained full-stack software solutions.",highlights:["Contributed to CI/CD pipelines using Jenkins and Docker.","Utilized core DSA concepts for ranking and recommendation logic.","Ensured efficient in-memory caching and rapid lookups."],tech:["Java","Spring Boot","React","Docker","AWS"]},{epoch:0,phase:"Foundation",title:"Software Engineer",company:"Wipro",companyType:"Technology Consulting",period:"Jan 2020 – May 2023",domain:"Tech",domainColor:"#7c3aed",accuracy:60,loss:.4,description:"Started my professional journey building foundational backend services and integrations.",highlights:["Developed backend logic optimized for growing data and traffic.","Built and deployed scalable applications with a focus on clean engineering.","Mastered core data structures including hash maps, tree traversals, and comparator-based sorting."],tech:["Java","Spring","Angular","PostgreSQL","Jenkins"]}],r=[{title:"Master's degree, Computer and Information Systems Security",issuer:"Wilmington University",date:"Completed",description:"Advanced degree focusing on information assurance."},{title:"Generative AI For Beginners",issuer:"Online Certification",date:"Recent",description:"Comprehensive introduction to generative artificial intelligence."},{title:"EF SET English Certificate 62/100 (C1 Advanced)",issuer:"EF Standard English Test",date:"Recent",description:"Demonstrated advanced English proficiency."},{title:"JAVA MASTER CLASS",issuer:"Online Platform",date:"Recent",description:"Deep dive into advanced Java programming and frameworks."}]}};var n=require("../../../webpack-runtime.js");n.C(e);var a=e=>n(n.s=e),i=n.X(0,[948],()=>a(3598));module.exports=i})();