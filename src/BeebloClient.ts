const { Client, Collection } = require('discord.js');

//BeebloClient is an override of Client that includes a commands properties to track supported bot commands
export class BeebloClient extends Client {
  constructor(options: Object) {
    super(options);
    
    this.commands = new Collection();
  }

}
