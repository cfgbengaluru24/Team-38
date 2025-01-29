# Team-38


### Setup Instructions

#### Clone the repository:

  ```
      git clone https://github.com/tanishkadeep/Regal-Estate.git
      cd regal-estate
  ```

#### Backend Setup

1. Navigate to the backend directory & install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create a .env file:

   ```
   DATABASE_URL=your_mongodb_connection_url
   JWT_SECRET=your_jwt_secret_key
   ```

3. Start the backend server:

   ```
   npm run dev
   ```

#### Frontend Setup

1. Navigate to the frontend directory & install dependencies:

   ```
   cd frontend
   npm install
   ```

2. Start the frontend server:

   ```
   npm run dev
   ```

#### Server Setup
1.  Create a .env file in the root:
   ```
    OPENAI_API_KEY=
    WEAVIATE_AUTH_KEY=
    MONGO_URL=
  ```

2. Navigate to the server directory:

   ```
   cd server
   ```

3. Start the server:

   ```
   python main.py
   ```

 <br /> <br /> The code ("Code") in this repository was created solely by the student teams during a coding competition hosted by JPMorgan Chase Bank, N.A. ("JPMC"). JPMC did not create or contribute to the development of the Code. This Code is provided AS IS and JPMC makes no warranty of any kind, express or implied, as to the Code, including but not limited to, merchantability, satisfactory quality, non-infringement, title or fitness for a particular purpose or use.