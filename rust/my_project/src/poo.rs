#[no_std]
#![no_main]

use cortex_m_semihosting::{debug, hprintln};
use cortex_m_rt::entry;

#[entry]
fn main()->!{
    hprintln("Hello world!\n").unwrap();
    debug::exit(debug::EXIT_SUCCESS);
    loop{

    }
}