use anchor_lang::prelude::*;
use std::str::FromStr;

// "first key (my_project-keypair.json)"
// declare_id!("7HB2ioJ5bFu2K5xnqxbSampSdCHdToftNzEJJCzkybUx");

// "second key (my_project-keypair.json)"
declare_id!("G8wijYorkKGjFkwNQ8zoUdWR67NoZ3Jwc3t4Q2dFJREb");


#[program]
pub mod my_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        
        let mut env_value = "nothing";
        
        // #[cfg(feature = "devnet-staging")]
        // env_value = "ye ole' staging";
        
        // #[cfg(feature = "devnet-prod")]
        // env_value = "the great prod!";
        
        msg!("Greetings from: {:?} on {:?}", ctx.program_id, env_value);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
