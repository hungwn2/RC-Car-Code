#ifndef TCPSERVER_H

#define TCPSERVER_H
#define PORTNO 3000
#include <iostream>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <netdb.h>
#include <thread>
#include <vector>
#include <string>
class server{
    public:
        server(int port);
        ~server();
        void start();
    private:
        crow::SimpleApp app;
        int server_socket;
        std::unordered_map<std::string, std::vector<std::string>> messages;
        std::mutex mtx;
        void handle_client(int client_socket);  
        int server_socket;
        int port;
}
#endif