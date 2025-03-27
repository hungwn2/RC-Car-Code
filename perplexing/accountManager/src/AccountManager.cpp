#include <iostream>



void AccountManager::createAccount(const std::string& username, const std::string& password) {

    std::lock_guard<std::mutex> lock(account_mutex);
    if (accounts.find(username)==accounts.end()){
        accounts[username]=new Account(username, password);
    }
    else{
        std:cout<<"Error, account w/username already exists"<<std::endl;
    }
}
bool AccountManager::login(const std::string& username, const std::strind& password){
    std::lock_guard<std::mutex> lock(accountMutex);
    if (accounts.find(username)!-account.end() && accounts[username].password==password){
        std::cout<<"Login successful"<<std::endl;
        return true;
    }
    std::cout<<"Error: Invalid username/password\n" 
    return false;
}
void AccountManager::deposit(const std::string& username, double amount){
    std::lock_guard<std::mutex> lock(accountMutex);
    if (accounts.find(username)!=accounts.end()){
        accounts[username]->second.balance+=amount;
        std::cout<<"deposited $"<<amount;
    }
    else{
        std::cout<<"Error: account not found!"
    }
}

bool AccountManager::withdraw(const std::string& username, double amount){
    std:lock_guard<std::mutex lock(accountMutex);
    if (accounts.find(username!=accounts.end())){
        if 
    }
}