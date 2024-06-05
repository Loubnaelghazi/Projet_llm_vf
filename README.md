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
![Usecase](https://github.com/WidadEs/llm/assets/118807169/2c8dbff5-c49a-4daf-bbd8-0c0a5fa35dba)
#### The use-case diagram illustrates the interactions between two primary actors, the User and the Admin, with the system. The User engages with the chatbot to perform actions such as using the chatbot, requesting information, receiving provided information, and viewing data. The Admin is responsible for managing the data, which includes tasks like scraping data from relevant sources and storing it appropriately. The diagram highlights the flow of actions and responsibilities, showing how the User interacts with the chatbot for information retrieval while the Admin ensures data management and system functionality. This helps in understanding the roles and use cases involved in maintaining and utilizing the chatbot system.

## Class diagram
![diagram](https://github.com/WidadEs/llm/assets/118807169/162334cb-7fd6-4660-87c3-acdced37e641)
#### The class diagram for the project illustrates the various components and their interactions. The DataCollection class is responsible for scraping, storing, and processing data related to FSTT. The Methodology class utilizes this data to implement various techniques like Retrieval Augmented Generation (RAG), LangChain, and vector databases, while also fine-tuning and validating these methods. BackendDevelopment supports the methodology by choosing appropriate frameworks, implementing DevOps tools, and monitoring performance. SinglePageApplication (SPA) is enabled by BackendDevelopment and involves choosing an architecture, analyzing benefits, and handling associated challenges. The LanguageModelTraining class fine-tunes and evaluates language models using the data and methods defined in Methodology. Finally, the UserInterfaceDesign class focuses on designing an accessible user interface and conducting user testing to refine the design. The diagram also highlights the relationships between these components, showing how data flows and methodologies support various aspects of the project, integrating different functionalities to create a cohesive system.

# Architecture
## Fine tuning
![finetuning](https://github.com/WidadEs/llm/assets/118807169/435945d4-3207-4d1a-8ad9-b48840c76ddc)
## RAG
<img width="609" alt="rag" src="https://github.com/WidadEs/llm/assets/118807169/c304e0db-9442-4f28-a7de-bf62d0df3ede">

# Used technologies
## Chromadb
<img width="476" alt="chroma" src="https://github.com/WidadEs/llm/assets/118807169/a8643675-242f-44b5-b5cb-294bf32bee9e">

#### Chroma DB is a vector store that is open-source and is utilized for the retrieval of vector embeddings. We will create a vectors store, add collections, add text to the collection, and perform a query search with and without meta filtering.

## FastAPI
![fastapi-logo](https://github.com/WidadEs/llm/assets/118807169/bcf10278-8808-4fde-8347-9a8e65221b59) 

#### FastAPI is known for its exceptional performance. It is often considered the most performant Python framework for developing REST APIs.
## React
![React-Symbol](https://github.com/WidadEs/llm/assets/118807169/3d3441ea-8b65-4aa0-b704-7d7748680d82)

#### React is a declarative, component-based, open-source front-end JavaScript library for building user interfaces. Whew! There's a lot to unpack there, so let's go through each piece of that definition.
# Used models
## gemma-2b-it
#### The Gemma-2b-it Language Model is part of the Gemma family of lightweight, state-of-the-art open models developed by Google DeepMind and other teams across Google. Inspired by the Gemini models, Gemma models aim to provide best-in-class performance while adhering to rigorous standards for safety and responsible AI development.
#### Gemma-2b-it is an instruct version of the Gemma model and it is one of the two sizes of Gemma models released, along with Gemma-7b. Both sizes come with pre-trained and instruction-tuned variants, offering state-of-the-art performance relative to their sizes. The Gemma models share technical and infrastructure components with Gemini, enabling them to achieve high performance directly on developer laptops or desktop computers.

# Realization
![l1](https://github.com/WidadEs/llm/assets/118807169/a17b9eeb-27db-4005-b9e1-e92ffde2bc87)

![l2](https://github.com/WidadEs/llm/assets/118807169/d72c328e-2eda-4486-ab3a-992636c47258)
