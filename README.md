# **Setup Instructions**  

Follow these steps to set up the project:  

## **1. Clone the repository**  

```sh
git clone https://github.com/acharyayush/Udharo.git
cd Udharo
```

## **2. Install and Set Up MongoDB Compass**  

MongoDB Compass is a GUI for managing your MongoDB databases.  

### **Install MongoDB Compass**  
- **Download**: [MongoDB Compass](https://www.mongodb.com/try/download/compass)  
- **Install**: Follow the installation instructions for your OS.  
- **Launch MongoDB Compass** after installation.  

### **Connect to MongoDB**  
1. Open MongoDB Compass.  
2. Click on **"New Connection"**.  
3. Use the default **local connection string**:  
   ```
   mongodb://localhost:27017
   ```
4. Click **Connect**.  
5. If successful, you will see the databases list.  

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

- Navigate to the server directory:  

```sh
cd ../server
```

- Install dependencies:  

```sh
npm install
```

- Copy the `.env.example` file to `.env`:  

```sh
cp .env.example .env
```

- **Ensure MongoDB is running**  
  If you have installed MongoDB locally, make sure the MongoDB service is running before starting the server.  
  You can start MongoDB using:  
  ```sh
  mongod
  ```

- Run the server:  

```sh
npm run devStart
```

---

Now, your project and MongoDB Compass should be fully set up! 🚀
