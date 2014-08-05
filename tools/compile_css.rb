if ARGV.first == 'production' || ENV['RACK_ENV'] == 'production'
  cdn = 'http://cdn.wendax.com/s/'
else
  cdn = '/public/'
end

src_dir = 'src/css/'
target_dir = 'public/css/'

Dir.entries(src_dir).sort()[2..-1].each do |file|
  body = File.open(src_dir + file, "r+").read
  body = body.gsub("\n", "").strip
  body = body.gsub("{!cdn!}", cdn)
  File.open(target_dir + file, "w+").write(body)
end
