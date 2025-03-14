# **Setup Instructions**  

Follow these steps to set up the project:  

## **1. Fork the repository**  
- Fork the repository and clone it.
- Navigate to the Udharo directory:
    ```sh
    cd Udharo
    ```

## **2. Install and Set Up MongoDB Compass**  

MongoDB Compass is a GUI for managing your MongoDB databases.  

### **Install MongoDB Compass**  
- **Download**: [MongoDB Compass](https://www.mongodb.com/try/download/compass)  
- **Install**: Follow the complete installation instructions  
- **Ensure MongoDB is running**  
     ```sh
  mongod
  ```
    If this does not work, press Win + R and type services.msc. Search MongoDB,
    right click on it and click start. Now its status should be running.

## **3. Set up the client**  

- Navigate to the client directory:  

    ```sh
    cd client
    ```

- Install dependencies:  

    ```sh
    npm install
    ```

- Copy the `.env.example` file to `.env`:  

    ```sh
    cp .env.example .env
    ```

- Run the application:  

    ```sh
    npm run dev
    ```

## **4. Set up the server**  
- Open new terminal and navigate to the server directory:  
    ```sh
    cd server
    ```

- Install dependencies:  

    ```sh
    npm install
    ```

- Copy the `.env.example` file to `.env`:  

    ```sh
    cp .env.example .env
    ```
    
- Run the server:  

    ```sh
    npm run devStart
    ```
---
