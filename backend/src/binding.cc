/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT. */

#include <nan.h>
#include <stdio.h>

extern "C" void node_main();
extern "C" void neon_init(v8::Local<v8::Object> module, void *f);

void __neon_main__(v8::Local<v8::Object> module) {
  neon_init(module, (void *)node_main);
}

NODE_MODULE(backend, __neon_main__)
