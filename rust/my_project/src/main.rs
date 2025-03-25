#![no_std]
#![no_main]
//core lib instead of std lib
use core::panic::PanicInfo;

use cortex_m::asm;
use cortex_m_rt::entry;
use panic_halt as _;
use freertos_rust::*;
use stm32l4xx_hal::{prelude::*, pac, gpio::{Gpioe, Output, PushPull}};

#[entry]
fn main() -> ! {
    asm::nop();
    loop {
        asm::bkpt();
    }
}
fn main() {
    println!("Hello, world!");
}
