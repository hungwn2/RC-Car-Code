#include <iostream>
#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>

typedef websocketpp::server<websocketpp::config::asio> server;

server echo_server;

void on_message(websocketpp::connection_hdl hdl, server::message_ptr msg) {
    std::string message = msg->get_payload();
    std::cout << "Received message: " << message << std::endl;

    echo_server.send(hdl, message, websocketpp::frame::opcode::text);
}

int main() {
    try {
        // Initialize the server
        echo_server.init_asio();
        
        // Set the message handler
        echo_server.set_message_handler(&on_message);

        // Listen on port 9002
        echo_server.listen(9002);
        echo_server.start_accept();

        std::cout << "Server started on ws://localhost:9002" << std::endl;

        // Start the ASIO io_service to handle WebSocket communication
        echo_server.run();
    } catch (const websocketpp::exception &e) {
        std::cerr << "Exception: " << e.what() << std::endl;
    }

    return 0;
}
