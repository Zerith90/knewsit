$(document).ready(()=>{
	$('#login').click(()=>{
		loading()
		$.post('/auth/local',{
			user:$('#user').val(),
			password:$("#password").val()
		},(results)=>{
			loading()
			if(!results.auth) $('#authenticationFailed').show()
			else window.location.href="/"
		})
	})

	function loading(){
		$('#authenticationFailed').hide()
		$('.progress').toggle()
	}

})