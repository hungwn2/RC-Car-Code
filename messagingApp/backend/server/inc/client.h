#ifndef CLIENT_H
#define CLIENT_H

#include <string>
class client{
    public:
        client(std::string ip, int port);
        ~client();
        void connect_and_send();
    private:
        int client_socket;
        std::string server_address;
        int port;

};
#endif