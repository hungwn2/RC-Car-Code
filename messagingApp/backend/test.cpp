#include "crow.h"

// crow::json::wvalue Post::to_json() const {
//     crow::json::wvalue result;
//     result["id"] = id;
//     result["name"] = name;
//     result["description"] = description;
//     result["price"] = price;
//     result["quantity"] = quantity;
//     return result;
// } 

int main() {
    crow::SimpleApp app;

    CROW_ROUTE(app, "/")([](){
        return "Hello world!";
    });

    app.port(18080).run();
    return 0;
}