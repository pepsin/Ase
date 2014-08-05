if ARGV.first == 'production' || ENV['RACK_ENV'] == 'production'
  cdn = 'http://cdn.wendax.com/s/'
else
  cdn = '/public/'
end

arr =  Dir.entries("src/").sort()[2..-1].select {|x| x.match(/.*\.html/) }

arr.each do |file|
  body = File.open("src/" + file, "r+").read
  body = body.gsub("{!cdn!}", cdn)
  File.open("public/" + file, "w+").write(body)
end
