import { createWindow } from '../window'
import { startGame } from '../../game'


export function createMultiplayerWindow() {
	var multiplayerMenu = document.createElement('div')
	multiplayerMenu.style.padding = '10px'

	var inputGroup = document.createElement('div')
	inputGroup.classList.add('input-group')


	var serverInput = document.createElement('input')
	serverInput.id = 'menu_server_input'
	serverInput.classList.add('form-control')
	serverInput.setAttribute('required', '');
	serverInput.setAttribute('placeholder', "Server adress with port");
	serverInput.value="3.14.87.35:3000"

	inputGroup.appendChild(serverInput)

	var appendDiv = document.createElement('div')
	appendDiv.classList.add('input-group-append')

	var connectButton = document.createElement('button')
	connectButton.id = 'menu_connect'
	connectButton.classList.add('btn')
	connectButton.classList.add('btn-secondary')
	connectButton.onclick = function() {
		var nick = localStorage.getItem('nickname')
		var server = serverInput.value
		console.log(nick, server)

		//history.replaceState({}, null, '?server=' + server)

		startGame(nick, server, null)
	}

	connectButton.innerHTML = 'Join'

	appendDiv.appendChild(connectButton)
	inputGroup.appendChild(appendDiv)

	multiplayerMenu.appendChild(inputGroup)

	var sizeLock = document.createElement('div')
	sizeLock.style = 'overflow:auto; max-height: 100vh; height: 400px;'

	var serverList = document.createElement('table')
	serverList.id = 'menu_serverlist'
	serverList.setAttribute('class', "table table-sm")

	var serverListHead = document.createElement('thead')
	serverListHead.style.backgroundColor = '#88888844'
	serverListHead.innerHTML =`
		<tr>
			<th scope="col">Address</th>
			<th scope="col">Name</th>
			<th scope="col">Motd</th>
			<th scope="col"></th>
		</tr>
		`
	serverList.appendChild(serverListHead)
	sizeLock.appendChild(serverList)
	multiplayerMenu.appendChild(sizeLock)


	var serverListBody = document.createElement('tbody')
	serverListBody.classList.add('table-hover')
	serverListBody.style.overflowY = 'scroll'
	serverList.appendChild(serverListBody)


	var multiplayerWindow = createWindow('menu_multiplayer', 'Multiplayer servers', ['800px', '500px'], multiplayerMenu)
	

	setTimeout(function() {
		fetch('http://localhost:9000/update').then ( response => response.json())
			.then(function(data) {
				console.log(data)//
				console.log('lol')
				var x = 0
				var array = Object.values(data)
				array.forEach( function(item) {
					console.log(item)
					var row = serverListBody.insertRow(x)
					x = x + 1
	
					var cell1 = row.insertCell(0)
					var cell2 = row.insertCell(1)
					var cell3 = row.insertCell(2)
					var cell4 = row.insertCell(3)
	                var cell5=row.insertCell(4)
	
					cell1.innerHTML = 'http://'+item.ip
					cell2.innerHTML = item.address
					cell3.innerHTML = item.imagess
	            
					var button = document.createElement('button')
					button.innerHTML = 'Select'
					button.classList.add("btn")
					button.classList.add("btn-outline-secondary")
					button.classList.add("btn-sm")
					cell4.appendChild(button)
					
					button.onclick = function(){ serverInput.value = item.ip }
					var imagi= document.createElement('img')
					//imagi.src='./hypixel.png';
					imagi.src=item.imagess.toString();//
					imagi.style.width='100px';
					imagi.style.height='100px';
					cell5.appendChild(imagi)
	
				})
				
			})
	})

	return multiplayerWindow.main

}

