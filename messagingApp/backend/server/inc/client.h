#pragma once
#include <string>
class client{
    public:
        client(std::string server_ip, int server_port);
        ~client();
        bool connectToServer();
        bool sendMessage(const std::string& message);
        std::string receiveMessage();

        
    private:
        int sockfd;
        std::string ip;
        int port;

};
#endif