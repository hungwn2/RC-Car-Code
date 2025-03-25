#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h> 

client::client(const std::string& server_address, int port): server_address(server_address), port(port), client_socket(-1){}

client::~client(){
    if (client_socket!=-1){
        close(client_socket);
    }
}

void client::connect_and_send(){
    sockaddr_in server_add;
    char buffer[256];
    ssize_t n;
    client_socket=socket(AF_INET, SOCK_STREAM, 0);
    if (client_socket<0){
        std::cerr << "Error opening socket" << std::endl;
        return;
    }
    server_addr.sin_family=AF_INET;
    server_addr.sin_port=htons(port);
    server_addr.sin_addr.s_addr=
}



// void error(const char *msg){
//     perror(msg);
//     exit(0);
// }
// int main(){
//     int sockfd, portno, n;
//     struct sockaddr_in serv_addr;
//     struct hostent *server;
//     char buffer[256];
//     portno(atoi(C_PORTNO));
//     client_fd=socket(AF_INET, SOCK_STREAM, 0);
//     if (client_fd<0){
//         std::cerr << "Error opening socket" << std::endl;
//         return;
//     }
//     server-gethostbyname();
//     if (server == NULL){
//         std::cerr << "Error, no such host" << std::endl;
//         return;
//     }
//     bzero((char*)&serv_addr, sizeof(serv_addr));
//     serv_addr.sin_family = AF_INET;
//     bcopy((char *)server->h_addr, (char *)&serv_addr.sin_addr.s_addr. server->h_length);
//     serv_addr.sin_port=htons(S_PORTNO);
//     if (connect(sockfd, (struct sockaddr *)&serv_addr, sizeof(serv_addr))<0){
//         std::cerr << "Error connecting" << std::endl;
//         return;
//     }
//     bzero(buffer, 256);
//     fgets(buffer, 255, );
//     n=write(sockfd, buffer, strlen(buffer));
//     if (n<0) std::cerr<<"Error writing to socket"<<std::endl;
//     bzero(buffer, 256);
//     n=read(sockfd, buffer, 255);
//     if (n<0) std::cerr<<"Error reading from socket"<<std::endl;
//     printf("%s\n", buffer);
//     close(sockfd);
//     return 0;

// }