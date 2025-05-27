#include "../inc/server.h"
#include <iostream>

int main(){
    int port=18080;
    std::cout<<"Launching messaging server on port"<<port<<std::endl;
    server srv(port);
    srv.run();
    return 0;
    
}