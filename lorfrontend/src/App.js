import React, { useState } from 'react';
import { ethers } from 'ethers';
import abi from './abi/abi.json';
import './App.css'; 

const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Add your contract address here

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [student, setStudent] = useState({});
  const [studentId, setStudentId] = useState('');
  const [status, setStatus] = useState('');

  const connectWallet = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const contractInstance = new ethers.Contract(contractAddress, abi, signer);

      setAccount(address);
      setContract(contractInstance);
      setStatus('✅ Wallet connected successfully!');
    } catch {
      setStatus('❌ Wallet connection failed.');
    }
  };

  const addStudent = async () => {
    if (!contract) return setStatus('⚠️ Please connect your wallet first.');
    try {
      const tx = await contract.addStudent(student.name, student.course, student.email);
      await tx.wait();
      setStatus('✅ Student added successfully!');
    } catch {
      setStatus('❌ Failed to add student.');
    }
  };

  const requestRecommendation = async () => {
    if (!contract) return setStatus('⚠️ Connect wallet first.');
    try {
      const tx = await contract.requestRecommendation(Number(studentId));
      await tx.wait();
      setStatus('📩 Recommendation requested.');
    } catch {
      setStatus('❌ Could not request recommendation.');
    }
  };

  const approveRecommendation = async () => {
    if (!contract) return setStatus('⚠️ Connect wallet first.');
    try {
      const tx = await contract.approveRecommendation(Number(studentId));
      await tx.wait();
      setStatus('✅ Recommendation approved.');
    } catch {
      setStatus('❌ Not authorized or error occurred.');
    }
  };

  const getStudent = async () => {
    if (!contract) return setStatus('⚠️ Connect wallet first.');
    try {
      const data = await contract.getStudent(Number(studentId));
      setStatus(
        `👤 Name: ${data[0]} | 📘 Course: ${data[1]} | 📧 Email: ${data[2]} | 📝 Requested: ${data[3]} | ✅ Approved: ${data[4]}`
      );
    } catch {
      setStatus('❌ Error fetching student.');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>🎓 Letter of Recommendation DApp</h2>
        <p>A decentralized system for managing student LORs</p>
      </div>

      <div className="card">
        <h3>🔌 Connect Wallet</h3>
        <button onClick={connectWallet}>
          {account ? '🔗 Wallet Connected' : '🔌 Connect MetaMask'}
        </button>
        {account && <p className="success">✅ Connected: {account}</p>}
      </div>

      <div className="card">
        <h3>🎓 Add New Student</h3>
        <input placeholder="👤 Name" onChange={(e) => setStudent({ ...student, name: e.target.value })} />
        <input placeholder="📘 Course" onChange={(e) => setStudent({ ...student, course: e.target.value })} />
        <input placeholder="📧 Email" onChange={(e) => setStudent({ ...student, email: e.target.value })} />
        <button className="add" onClick={addStudent}>➕ Add Student</button>
      </div>

      <div className="card">
        <h3>📩 Request Recommendation</h3>
        <input type="number" placeholder="🎯 Student ID" onChange={(e) => setStudentId(e.target.value)} />
        <button className="request" onClick={requestRecommendation}>📬 Request Now</button>
      </div>

      <div className="card">
        <h3>✅ Approve Recommendation (Faculty)</h3>
        <input type="number" placeholder="🎯 Student ID" onChange={(e) => setStudentId(e.target.value)} />
        <button className="approve" onClick={approveRecommendation}>✔️ Approve</button>
      </div>

      <div className="card">
        <h3>🔍 View Student Info</h3>
        <input type="number" placeholder="🎯 Student ID" onChange={(e) => setStudentId(e.target.value)} />
        <button className="view" onClick={getStudent}>🔎 View Info</button>
      </div>

      {status && <div className="status">{status}</div>}
    </div>
  );
}

export default App;
