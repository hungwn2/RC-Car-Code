#pragma once
#define ASIO_STANDALONE
#include "crow_all.h"
#include <string>
#include <unordered_map>
#include <vector>
#include <mutex>

class server{
    public:
        server(int port);
        ~server();
        void start();
        void handle_client(int socket);
        void run();
    private:
        int port;
        int server_socket;
        crow::SimpleApp app;
        std::unordered_map<std::string, std::vector<std::string>> messages;
        std::mutex mtx;
};