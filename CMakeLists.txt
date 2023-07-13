cmake_minimum_required(VERSION 3.18...3.25)

project(
  jsigraph
  DESCRIPTION "A WebAssembly binding for igraph library"
  HOMEPAGE_URL https://igraph.org
)

add_subdirectory(igraph)

set(EMSCRIPTEN_TARGET_NAME jigraph)
set(EMSCRIPTEN_SOURCES interface/bind.cpp)

add_executable(${EMSCRIPTEN_TARGET_NAME} ${EMSCRIPTEN_SOURCES})

set(IGRAPH_EMCC_FLAGS "--bind -s ALLOW_MEMORY_GROWTH=1 -s WASM=1 -s MODULARIZE=1 -s EXPORT_NAME=IGraph -O3")
if (DEBUG)
  set(IGRAPH_EMCC_FLAGS "${IGRAPH_EMCC_FLAGS} -g2 -s ASSERTIONS=2")
endif()

set_target_properties(
  ${EMSCRIPTEN_TARGET_NAME}
    PROPERTIES
    CXX_STANDARD 17
    CXX_STANDARD_REQUIRED YES
    CXX_EXTENSIONS NO
    LINK_FLAGS ${IGRAPH_EMCC_FLAGS}
)

target_link_libraries(${EMSCRIPTEN_TARGET_NAME} PUBLIC igraph)
