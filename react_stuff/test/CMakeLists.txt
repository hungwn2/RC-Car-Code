cmake_minimum_required(VERSION 3.10)
project(MessagingApp)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_PREFIX_PATH "C:/vcpkg/installed/x64-windows/share")
set(ASIO_INCLUDE_DIR "C:/vcpkg/installed/x64-windows/include")
include_directories(${ASIO_INCLUDE_DIR})

# Use vcpkg toolchain file
set(CMAKE_TOOLCHAIN_FILE "C:/vcpkg/scripts/buildsystems/vcpkg.cmake" CACHE STRING "VCPKG toolchain file")

# Find Crow
find_package(Crow CONFIG REQUIRED)

add_executable(MessagingApp messaging.cpp)
target_link_libraries(MessagingApp PRIVATE Crow::Crow)
