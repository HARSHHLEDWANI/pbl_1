import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Wallet, ArrowUpRight, ArrowDownRight, RefreshCw, Settings, LogOut } from "lucide-react";


const UserDashboard = () => {
  const { user, signOut } = useAuth();
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState("0.00");
  const [transactions] = useState([
    { id: 1, type: "received", amount: "2,500.00", from: "John Doe", date: "2025-03-04" },
    { id: 2, type: "sent", amount: "1,200.00", to: "Jane Smith", date: "2025-03-03" },
  ]);

  // Function to connect to MetaMask
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed! Please install it to continue.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]); // Store the connected wallet address
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Wallet className="h-6 w-6 text-red-500" />
            <span className="text-xl font-bold text-white">SecureFlow</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-800 rounded-lg">
              <Settings className="h-5 w-5 text-white" />
            </button>
            <button onClick={signOut} className="p-2 hover:bg-gray-800 rounded-lg">
              <LogOut className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          <div className="grid gap-6 md:grid-cols-12">
            {/* Left Section */}
            <div className="md:col-span-8 space-y-6">
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-sm text-gray-400">Total Balance</h2>
                    <p className="text-3xl font-bold text-white">${balance}</p>
                  </div>
                  <button className="p-2 hover:bg-gray-800 rounded-lg">
                    <RefreshCw className="h-5 w-5 text-white" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-colors">
                    <ArrowUpRight className="h-5 w-5" />
                    <span>Send</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                    <ArrowDownRight className="h-5 w-5 text-white" />
                    <span>Receive</span>
                  </button>
                </div>
              </div>

              {/* MetaMask Wallet Section */}
              <div className="bg-gray-900 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Wallet Connection</h2>
                {walletAddress ? (
                  <p className="text-green-400">Connected: {walletAddress}</p>
                ) : (
                  <button
                    onClick={connectWallet}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>

              {/* Recent Transactions */}
              <div className="bg-gray-900 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "received" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {transaction.type === "received" ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {transaction.type === "received" ? "Received from" : "Sent to"}
                          </p>
                          <p className="text-sm text-gray-400">{transaction.type === "received" ? transaction.from : transaction.to}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">${transaction.amount}</p>
                        <p className="text-sm text-gray-400">{transaction.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:col-span-4 space-y-6">
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-red-500">{user.email[0].toUpperCase()}</span>
                  </div>
                  <h2 className="font-bold text-xl text-white mb-1">{user.user_metadata.name || "User"}</h2>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-white">
                    View Transaction History
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hoverbg-gray-800 transition-colors text-white">
                    Security Settings
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
