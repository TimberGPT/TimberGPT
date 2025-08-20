# 🌲 TimberGPT – AI-Powered Assistant for the Timber Industry in Bangladesh  


TimberGPT is an interactive AI system designed to support the **timber industry in Bangladesh** through domain-specific knowledge retrieval and **automated wood image analysis**.  
It combines **Natural Language Processing, Computer Vision, and RAG-based search** to provide workers, researchers, and policymakers with actionable insights.  

 

---

## ✨ Features  

- 🪵 **Domain-Specific Knowledge Assistant**  
  - Answers timber-related queries in the Bangladeshi context.  
  - RAG system built on **custom datasets** for forestry and timber knowledge.  

- 📷 **AI-Powered Image Analysis**  
  - Tree ring detection → **age estimation**.  
  - Wood surface defect analysis & knot localization.  
  - Normal vs defective surface ratio computation.  
  - Automated log counting.  

- 📑 **Automated Report Generation**  
  - Generates structured reports from timber images.  
  - Provides statistical summaries, defect localization, and inspection notes.  

---

## 🖼️ Demo Screens:  

### TimberGPT Demo:
[![Watch the Demo](https://img.youtube.com/vi/XN_AzgvYke8/maxresdefault.jpg)](https://youtu.be/XN_AzgvYke8)
 
 ### Image Analysis:
![Image Analysis](https://i.ibb.co.com/twyWRcgb/image-analysis.png)  

---

## 🚀 Tech Stack  

- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) – lightweight and high-performance API framework  
- **Database**: [ChromaDB](https://www.trychroma.com/) – embedding-based vector database for RAG  
- **Frontend**: [Next.js](https://nextjs.org/) – modern React framework  
- **Styling**: [TailwindCSS](https://tailwindcss.com/) – utility-first CSS framework  
- **AI/ML Models**:  
  - NLP-based RAG for knowledge retrieval  
  - YOLOv11 instance segmentation (Roboflow-trained) for wood defect/knot detection  
  - Custom models for ring detection & defect ratio  

---

## ⚙️ Installation & Setup  

```bash
# Clone the repository
git clone https://github.com/TimberGPT/TimberGPT.git
cd TimberGPT

# Backend Setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend Setup
cd frontend
npm install
npm run dev
