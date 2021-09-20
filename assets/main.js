/*jshint esversion: 6 */

 var nodeOption = document.getElementById('scatterHost').value;

    ScatterJS.plugins( new ScatterEOS() );

    let api;

    const network = ScatterJS.Network.fromJson({
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        host: nodeOption,
        port: 443,
        protocol: 'https'

    });
    const rpc = new eosjs_jsonrpc.default(network.fullhost());

      ScatterJS.connect('safetoken.app', {network}).then(connected => {
            if (!connected) return console.error('no scatter');
            ScatterJS.login().then(id => {
                if (!id) return console.error('no identity');

                api = ScatterJS.eos(network, eosjs_api.default, {rpc});

            });

        });

      
      

      document.getElementById('doinit').style.visibility = "hidden";

     // Perpetually update the dapp
        const setStatus = () => {

        const status = document.getElementById('status');        
            if (!ScatterJS) return status.innerText = 'please login';
            if (!ScatterJS.identity) return status.innerText = 'please login', document.getElementById('loginButton').innerHTML = ' Login <i class="fas fa-key"></i>';
            status.innerText = ScatterJS.identity.accounts[0].name;
            const scatterAccount = ScatterJS.identity.accounts[0].name;
            document.getElementById('loginButton').innerHTML = ' Logout <i class="fas fa-unlock"></i>';


            




         rpc.get_table_rows({
                json: true,
                code: 'safetokenapp',
                scope: scatterAccount,
                table: 'accounts'
            }).then(function(value){
                const safeBalance = value.rows[0].balance;
                const safeBalance0 = parseFloat(safeBalance).toFixed(8);
                
        rpc.get_table_rows({
                json: true,
                code: 'tethertether',
                scope: scatterAccount,
                table: 'accounts'
            }).then(function(value){
                const usdtBalance = value.rows[0].balance;
                const usdtBalance0 = parseFloat(usdtBalance).toFixed(4);

                if (usdtBalance && safeBalance) {document.getElementById('doinit').style.visibility = "hidden";}
                
        rpc.get_table_rows({
                json: true,
                code: 'safetokenapp',
                scope: 'SAFE',
                table: 'stat'
            }).then(function(value){
                const safeSupply = parseFloat(value.rows[0].supply).toFixed(8);
                    
        rpc.get_table_rows({
                json: true,
                code: 'tethertether',
                scope: 'safetokenapp',
                table: 'accounts'
            }).then(function(value){
                const usdtSupply = parseFloat(value.rows[0].balance).toFixed(4);

        rpc.get_table_rows({
                json: true,
                code: 'svxmintofeos',
                scope: 'safetokenapp',
                table: 'accounts'
            }).then(function(value){
                const svxSupply = parseFloat(value.rows[0].balance).toFixed(4);
                const svxMiningValue = (svxSupply / 10000);

                var usdtSafeValue = (safeSupply / usdtSupply);
                        usdtSafeValue = (usdtSafeValue * 0.95);
                
              
                

                safeValue.innerText = parseFloat(usdtSupply / safeSupply).toFixed(4);

                var safeUsdtPrice = (usdtSupply / safeSupply);

                var safeUserValueStat = (safeBalance0 * safeUsdtPrice).toFixed(4);

                safeBalanceValueStat.innerText = ('Your balance = ' + safeBalance);
                safeValueStat.innerText = (safeBalance + ' = ' + safeUserValueStat + ' USDT');

                safeTvl.innerText = ("TVL = " + usdtSupply + " USDT");

                document.getElementById("usdtSend").placeholder = "Max = " + usdtBalance;
                document.getElementById("myRange").max = usdtBalance0;
                document.getElementById("safeSend").placeholder = "Max = " + safeBalance;
                document.getElementById("myRange0").max = safeBalance0;

                var usdtSendAmount = document.getElementById('usdtSend').value;
                var safeSendAmount = document.getElementById('safeSend').value;
                

                if (usdtSendAmount > 0) {

                    var safeMintAmount = (usdtSendAmount * usdtSafeValue).toFixed(8);

                }   else {
                    var safeMintAmount = "";
                }

                if (usdtSendAmount > 0  && usdtSendAmount < 10000) {

                    var svxMineAmount = (usdtSendAmount * svxMiningValue).toFixed(4);

                }   

                else if (usdtSendAmount >= 10000) {
                    svxMineAmount = (10000 * svxMiningValue).toFixed(4);
                }



                else  {
                    var svxMineAmount = "";
                }


                if (safeSendAmount > 0) {

                    var usdtWithdrawAmount = ((safeSendAmount * safeUsdtPrice) - 0.0001).toFixed(4);

                }   else {
                    var usdtWithdrawAmount = "";
                }



                usdtSafeConversionDiv.innerText = ('Deposit ' + usdtSendAmount + ' USDT');
                usdtSafeConversionDiv2.innerText = ('Receive ' + safeMintAmount + ' SAFE');
                usdtSafeConversionDiv3.innerText = ('Bonus = ' + svxMineAmount + ' SVX');

                safeUsdtConversionDiv.innerText = ('Destroy ' + safeSendAmount + ' SAFE');
                safeUsdtConversionDiv2.innerText = ('Withdraw ' + usdtWithdrawAmount + ' USDT');





                
            });


            });

            });

            });

            }).catch(err => {
                    console.error('error thrown: ', err);
                    document.getElementById('doinit').style.visibility = "visible";
                });

            };

setStatus();
setInterval(() => {
    setStatus();
}, 500);


function changeNode() {
    nodeOption = document.getElementById('scatterHost').value;
    const network = ScatterJS.Network.fromJson({
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        host: nodeOption,
        port: 443,
        protocol: 'https'

    });
    const rpc = new eosjs_jsonrpc.default(network.fullhost());

      ScatterJS.connect('safetoken.app', {network}).then(connected => {
            if (!connected) return alert('no scatter');
            ScatterJS.login().then(id => {
                if (!id) return alert('no identity');
                api = ScatterJS.eos(network, eosjs_api.default, {rpc});
                if (connected) return alert('Node succefully changed to ' + nodeOption);

            });

        });
}




function help(){
    if (confirm("SAFE, like REX, can only increase in price. SAFE is decentralized, immutable, and open-source. The way DEFI was meant to be.  Click OK to speak with the developers on Telegram if you still have questions.") == true) 
        {window.open("https://t.me/safetokenapp");} 

    else {return false;}

}

function showVal(val) {


                        document.getElementById('usdtSend').value = val;

                        
                    } 


function showVal0(val) {


                        document.getElementById('safeSend').value = val;

                        
                    } 


function signInOut() {
    if (!ScatterJS) return ScatterJS.login();
    if (!ScatterJS.identity) return ScatterJS.login();
    else    {
                ScatterJS.logout();
            }
     
}




function mintSafe(){
            ScatterJS.login().then(id => {
                if (!id) return console.error('no identity');
                const account = ScatterJS.account('eos');

                rpc.get_table_rows({
                json: true,
                code: 'safetokenapp',
                scope: 'SAFE',
                table: 'stat'
            }).then(function(value){
                const safeSupply = parseFloat(value.rows[0].supply).toFixed(8);
                    
            rpc.get_table_rows({
                json: true,
                code: 'tethertether',
                scope: 'safetokenapp',
                table: 'accounts'
            }).then(function(value){
                const usdtSupply = parseFloat(value.rows[0].balance).toFixed(4);

            rpc.get_table_rows({
                json: true,
                code: 'svxmintofeos',
                scope: 'safetokenapp',
                table: 'accounts'
            }).then(function(value){
                const svxSupply = parseFloat(value.rows[0].balance).toFixed(4);
                const svxMiningValue = (svxSupply / 10000);


                var usdtSendAmount = document.getElementById('usdtSend').value;
                var usdtSendAmount0 = document.getElementById('usdtSend').value;
                var usdtSendAmount1 = document.getElementById('usdtSend').value;
                usdtSendAmount = format_eos_amount(usdtSendAmount) + " USDT";
                usdtSendAmount0 = format_eos_amount(usdtSendAmount0);
                usdtSendAmount1 = format_eos_amount(usdtSendAmount1);

                if (usdtSendAmount1 > 10000) {usdtSendAmount1 = 10000;}

                var usdtSafePrice = parseFloat((safeSupply / usdtSupply)*0.95);
                var usdtSafeConversion = (usdtSendAmount0 * usdtSafePrice).toFixed(8);
                
                var usdtSvxConversion = (usdtSendAmount1 * svxMiningValue).toFixed(4);


                if (confirm("Deposit " + usdtSendAmount + " to receive " + usdtSafeConversion + " SAFE and " + usdtSvxConversion + " SVX") == true) {

                api.transact({
                    actions: [{
                        account: 'tethertether',
                        name: 'transfer',
                        authorization: //user paying for resources must go first
                            [{

                            actor: account.name,
                            permission: account.authority,

                        }],
                        data: {
                            //todo:pass in data object
                            from: account.name,
                            to: 'safetokenapp',
                            quantity: usdtSendAmount,
                            memo: ''
                            
                        }
                    }]

                }, {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }).then(res => {
                    console.log('sent tx: ', res);
                    alert('You successfully deposited ' + usdtSendAmount + '. You received ' + usdtSafeConversion + ' SAFE and ' + usdtSvxConversion + ' SVX');
                }).catch(err => {
                    console.error('error thrown: ', err);
                    alert(err);
                });
            }

            else {return false;}
             });

            });
            });

        });

        }


function burnSafe(){
            ScatterJS.login().then(id => {
                if (!id) return console.error('no identity');
                const account = ScatterJS.account('eos');
                var safeSendAmount = document.getElementById('safeSend').value;
                safeSendAmount = format_btc_amount(safeSendAmount) + " SAFE";
                var safeSendAmount0 = document.getElementById('safeSend').value;

                
                rpc.get_table_rows({
                json: true,
                code: 'safetokenapp',
                scope: 'SAFE',
                table: 'stat'
            }).then(function(value){
                const safeSupply = parseFloat(value.rows[0].supply).toFixed(8);
                    
        rpc.get_table_rows({
                json: true,
                code: 'tethertether',
                scope: 'safetokenapp',
                table: 'accounts'
            }).then(function(value){
                const usdtSupply = parseFloat(value.rows[0].balance).toFixed(4);

                var safeUsdtPrice = (usdtSupply / safeSupply);

                var safeUsdtConversion = ((safeSendAmount0 * safeUsdtPrice) - 0.0001).toFixed(4);
                




                if (confirm("Destroy " + safeSendAmount + " to withdraw " + safeUsdtConversion + " USDT") == true) {

                api.transact({
                    actions: [{
                        account: 'safetokenapp',
                        name: 'transfer',
                        authorization: //user paying for resources must go first
                            [{

                            actor: account.name,
                            permission: account.authority,

                        }],
                        data: {
                            //todo:pass in data object
                            from: account.name,
                            to: 'safetokenapp',
                            quantity: safeSendAmount,
                            memo: ''
                            
                        }
                    }]

                }, {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }).then(res => {
                    console.log('sent tx: ', res);
                    alert('You successfully destroyed ' + safeSendAmount + ' and withdrew ' + safeUsdtConversion + ' USDT');
                }).catch(err => {
                    console.error('error thrown: ', err);
                    alert(err);
                });
            }

            else {return false;}
             });

            });

        });

        }



        function doinit(){
            ScatterJS.login().then(id => {
                if (!id) return console.error('no identity');
                const account = ScatterJS.account('eos');

                if (confirm("Initialize SAFE and/or USDT Contracts") == true) {

                api.transact({
                    actions: [{
                        account: 'safetokenapp',
                        name: 'open',
                        authorization: //user paying for resources must go first
                            [{

                            actor: account.name,
                            permission: account.authority,

                        }],
                        data: {
                            //todo:pass in data object
                            owner: account.name,
                            symbol: '8,SAFE',
                            ram_payer: account.name
                            
                            
                        }
                    },


                    {
                        account: 'tethertether',
                        name: 'open',
                        authorization: //user paying for resources must go first
                            [{

                            actor: account.name,
                            permission: account.authority,

                        }],
                        data: {
                            //todo:pass in data object
                            owner: account.name,
                            symbol: '4,USDT',
                            ram_payer: account.name
                            
                            
                        }
                    }]

                },



                 {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }).then(res => {
                    console.log('sent tx: ', res);
                    alert('You successfully initialized SAFE and/or USDT Contracts');
                }).catch(err => {
                    console.error('error thrown: ', err);
                    alert(err);
                });
            }

            else {return false;}
           

        });

        }


function format_eos_amount(amount) {
    amount2 = parseFloat(amount).toFixed(4);
        return (amount2);
    }

function format_btc_amount(amount) {
    amount2 = parseFloat(amount).toFixed(8);
        return (amount2);
    }
