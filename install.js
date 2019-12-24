const core = require('@actions/core');
const {exec} = require('@actions/exec');
const path = require('path')


main().catch(err =>{
    core.setFailed(err.message);
})


async function main() {

    const implementation = core.getInput('implementation', {required: true});
    const version = core.getInput('version');
    const option = core.getInput('option');
    


    if (process.platform === 'darwin') {
        switch (implementation) {

            case'chez':
                await exec('brew install chezscheme');
                if(option === 'raven'){
                await exec('ln -s /usr/local/bin/chez /usr/local/bin/scheme');
                }
                break;
        }
        if(option === 'raven'){
            await exec('curl -L http://ravensc.com/install'); 
            await exec('scheme',[path.join(__dirname, 'install.sc')]);
        }
    } else if (process.platform === 'linux') {
        switch (implementation) {

            case'chez':
                await exec('sudo apt install chezscheme');
                break;
        }
        // if(option === 'raven'){
        //     await exec('curl -L http://ravensc.com/install | sudo scheme');
        // }
    }
  
    

  
}
