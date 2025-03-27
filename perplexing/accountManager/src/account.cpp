#include <iostream>
#include <unordered_map>
#include <mutex>
#include <string>

class Account{
    public:
    std::string name;
    std::string pass;
    double balance;

    Account(std::string uname, std::string pword, double bal=0):
    username(uname), password(pword), balance(bal){}
    
    void display(){
        std::cout<<"User: "<<username<< " | Balance: $"<<balance<<std::endl;
    }
}