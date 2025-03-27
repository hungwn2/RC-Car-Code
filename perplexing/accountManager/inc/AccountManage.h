#ifndef ACCOUNT_MANAGER_H
#define ACCOUNT_MANAGER_H

#include "Account.h"
#include <unordered_map>
#include <mutex>

class AccountManager {
private:
    std::unordered_map<std::string, Account> accounts;
    std::mutex accountMutex;

public:
    void createAccount(const std::string& username, const std::string& password);
    bool login(const std::string& username, const std::string& password);
    void deposit(const std::string& username, double amount);
    bool withdraw(const std::string& username, double amount);
    void displayAccounts();
};

#endif
