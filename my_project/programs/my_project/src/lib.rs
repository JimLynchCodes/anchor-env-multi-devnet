use anchor_lang::prelude::*;

declare_id!("7ocfwVdRp5Gegjd1UWBX4S6CjH54LY4SJBpEhiv2Y7L9");

#[program]
pub mod my_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
