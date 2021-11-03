
tick = 0

numbers = {}
bools = {}

loaded = false

function onTick()
	tick = tick + 1
	if(tick == 20) then
		tick = 0
		async.httpGet(5001, '/api/get-bus')	
	end
	
	for i=1, 32 do
		output.setBool(i, bools[i])
		output.setNumber(i, numbers[i])
	end
		
end

function httpReply(port, request_body, response_body)
	idx = 1
	for m in response_body:gmatch("%S+") do
		if(idx < 33) then
			bools[idx] = m == "1"
		else
			numbers[idx-32] = tonumber(m)
		end
		idx = idx + 1
	end
	loaded = true
end
