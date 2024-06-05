# Developing a chatbot fine-tuned on a custom context based on French language models (LLMs): case of study FSTT.
# Table of content 
  ## 1-Introduction
  ## 2-Objective
  ## 3-Conception
  ## 4-Architecture
  ## 5-Used technologies
  ## 6-Used models
  ## 7-Realization 
  ## 8-Conclusion
# Introduction
#### The development of a chatbot fine-tuned on a custom context based on French language models, particularly focusing on the Faculty of Sciences and Technology of Tangier (FSTT), represents a significant advancement in the application of artificial intelligence in educational contexts. This project, leveraging the capabilities of Retrieval Augmented Generation (RAG), LangChain, and Vector Databases, aims to create a smart chatbot capable of providing accurate and contextually relevant information to users. The chatbot will be fine-tuned using a specialized French corpus that includes materials from FSTT courses and related activities, ensuring it is tailored to the specific needs and terminology of the institution.
# Objective
#### The primary objective of this project is to establish a comprehensive and efficient chatbot that serves the FSTT community. The chatbot will assist students, faculty, and other stakeholders by providing easy access to information about courses, activities, and other relevant details. To achieve this, the project will focus on:

#### Data Collection: Scraping and compiling data related to FSTT, including course information, academic schedules, and extracurricular activities.
#### Methodology: Implementing a step-by-step approach to develop the chatbot using RAG, LangChain, and Vector Databases. This includes referencing original research studies and papers to support the choice of these technologies.
#### Backend Development: Choosing an appropriate backend framework, such as FastAPI or Flask, based on performance and scalability requirements. Integrating DevOps tools for continuous integration and deployment.
#### Single Page Application (SPA): Opting for an SPA architecture to ensure a smooth and responsive user experience. Discussing the benefits and challenges of this approach.
#### Language Model Training: Fine-tuning language models specifically for the French language, taking into account linguistic and cultural nuances.
#### User Interface (UI) Design: Developing an intuitive and accessible UI that aligns with the preferences of the target audience, ensuring a seamless interaction with the chatbot.
#### By addressing these areas, the project aims to create a chatbot that not only meets the current needs of the FSTT community but also sets a benchmark for future developments in French language AI applications in educational settings.
# Conception
## Use Case
![use case](https://github.com/Loubnaelghazi/Projet_llm_vf/assets/114692135/9494cd63-6b12-4d76-8535-9e67d43bf62d)

#### The use-case diagram illustrates the interactions between two primary actors, the User and the Admin, with the system. The User engages with the chatbot to perform actions such as using the chatbot, requesting information, receiving provided information, and viewing data. The Admin is responsible for managing the data, which includes tasks like scraping data from relevant sources and storing it appropriately. The diagram highlights the flow of actions and responsibilities, showing how the User interacts with the chatbot for information retrieval while the Admin ensures data management and system functionality. This helps in understanding the roles and use cases involved in maintaining and utilizing the chatbot system.

## Class diagram
![diagram](https://github.com/Loubnaelghazi/Projet_llm_vf/assets/114692135/9236e1d8-55cf-404e-9e78-a66d46a07033)

#### The class diagram for the project illustrates the various components and their interactions. The DataCollection class is responsible for scraping, storing, and processing data related to FSTT. The Methodology class utilizes this data to implement various techniques like Retrieval Augmented Generation (RAG), LangChain, and vector databases, while also fine-tuning and validating these methods. BackendDevelopment supports the methodology by choosing appropriate frameworks, implementing DevOps tools, and monitoring performance. SinglePageApplication (SPA) is enabled by BackendDevelopment and involves choosing an architecture, analyzing benefits, and handling associated challenges. The LanguageModelTraining class fine-tunes and evaluates language models using the data and methods defined in Methodology. Finally, the UserInterfaceDesign class focuses on designing an accessible user interface and conducting user testing to refine the design. The diagram also highlights the relationships between these components, showing how data flows and methodologies support various aspects of the project, integrating different functionalities to create a cohesive system.

# Architecture
## Fine tuning
![finetuning](https://github.com/Loubnaelghazi/Projet_llm_vf/assets/114692135/6e451da4-2391-46e5-9be2-76c9af857801)

## RAG
![rag](https://github.com/Loubnaelghazi/Projet_llm_vf/assets/114692135/7056fdb1-f2d2-4968-81d9-7b9cdae88b43)


# Used technologies
## Chromadb
![chroma](https://github.com/Loubnaelghazi/Projet_llm_vf/assets/114692135/02acea78-da5d-492a-9da6-7dc4bf0db4a4)


#### Chroma DB is a vector store that is open-source and is utilized for the retrieval of vector embeddings. We will create a vectors store, add collections, add text to the collection, and perform a query search with and without meta filtering.

## FastAPI
![fast api](https://github.com/Loubnaelghazi/Projet_llm_vf/assets/114692135/0a61da15-6acf-4258-bdb3-099ffa2bf1f5)



#### FastAPI is known for its exceptional performance. It is often considered the most performant Python framework for developing REST APIs.
## React
![react](https://github.com/Loubnaelghazi/Projet_llm_vf/assets/114692135/515c930a-1dda-4881-bdae-026c41dbefc2)


#### React is a declarative, component-based, open-source front-end JavaScript library for building user interfaces. Whew! There's a lot to unpack there, so let's go through each piece of that definition.
# Used models
## gemma-2b-it
#### The Gemma-2b-it Language Model is part of the Gemma family of lightweight, state-of-the-art open models developed by Google DeepMind and other teams across Google. Inspired by the Gemini models, Gemma models aim to provide best-in-class performance while adhering to rigorous standards for safety and responsible AI development.
#### Gemma-2b-it is an instruct version of the Gemma model and it is one of the two sizes of Gemma models released, along with Gemma-7b. Both sizes come with pre-trained and instruction-tuned variants, offering state-of-the-art performance relative to their sizes. The Gemma models share technical and infrastructure components with Gemini, enabling them to achieve high performance directly on developer laptops or desktop computers.

# Realization
![interface1](https://github.com/Loubnaelghazi/Projet_llm_vf/assets/114692135/d59b6a5b-d9b0-4e93-b4b0-254a592e9519)

![12](https://github.com/Loubnaelghazi/Projet_llm_vf/assets/114692135/d2f7bec5-dfd7-4c6f-b2a4-86b3b1573d1d)

