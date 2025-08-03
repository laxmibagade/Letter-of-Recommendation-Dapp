```markdown
# 📚 Letter of Recommendation (LoR) DApp

This decentralized application (DApp) enables students to request recommendation letters, and allows authorized faculty to approve them on the Ethereum blockchain using smart contracts.

## 🔗 Live Contract on Sepolia

> 📎 [View on Etherscan](https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS)

---


## ✨ Features

### ✅ Smart Contract
- `addStudent(name, course, email)`
- `requestRecommendation(studentId)`
- `approveRecommendation(studentId)`
- `getStudent(studentId)`
- Admin-only:
  - `authorizeApprover(address)`
  - `deauthorizeApprover(address)`

### 🧑‍🎓 React Frontend
- MetaMask wallet connection
- Add student data
- Request/approve recommendation
- View student + recommendation status

---

## Part A – Smart Contract with Hardhat

### 📦 Install Hardhat and Dependencies

```bash
yarn add --dev hardhat
yarn add --dev @nomicfoundation/hardhat-toolbox dotenv
````

### 🔧 Compile Contract

```bash
npx hardhat compile
```

### 🧪 Run Tests

```bash
npx hardhat test
```

---

## Part B – Deploy to Sepolia

### 🔐 Environment Setup

Create a `.env` file:

```env
PRIVATE_KEY=your_private_key
INFURA_API_KEY=your_infura_project_id
```

### 🚀 Deploy Contract

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Copy the deployed contract address for frontend usage.

---

## Part C – React Frontend (with Yarn)

### 🧱 Install Frontend Dependencies

```bash
cd frontend
yarn install
```

### 🔌 Start Development Server

```bash
yarn start
```

> Make sure MetaMask is connected to Sepolia Testnet.

---

## 📂 Screenshots (Required)

Inside the `screenshots/` folder, include:

* 📸 Contract on Sepolia (Etherscan)
* 📸 UI working views:

  * Add Student
  * Request Recommendation
  * Approve Recommendation
  * View Details

---


## 📘 Learning Outcomes

* Solid understanding of smart contracts with Solidity
* Deploy using Hardhat + Sepolia (via Infura)
* Build and connect a React frontend with ethers.js
* Work with MetaMask and decentralized identities

---


## 👩‍💻 Author

**Laxmi Bagade**
[GitHub](https://github.com/laxmibagade) | [LinkedIn](https://www.linkedin.com/in/laxmi-bagade/)

---

