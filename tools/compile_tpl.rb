if(!File.directory?('public'))
  Dir.mkdir('public')
  Dir.mkdir('public/tmp')
  Dir.mkdir('public/js')
  Dir.mkdir('public/css')
else
  if(!File.directory?('public/tmp'))
    Dir.mkdir('public/tmp')
  end
  if(!File.directory?('public/js'))
    Dir.mkdir('public/js')
  end
  if(!File.directory?('public/css'))
    Dir.mkdir('public/css')
  end
end

dir = ARGV.first
src_dir = 'src/' + dir
total_strings = []
arr =  Dir.entries(src_dir).sort()[2..-1]
if arr
  arr.each do |file_name|
    body = File.open(src_dir + "/" + file_name, "r+").read
    body = body.gsub("\n", "").strip.gsub("\"", "\'").gsub("{{", "\"+data.").gsub("}}", "+\"")
    total_strings << "#{file_name[0..-6]}:function(data){return \"#{body}\";}"
  end  
end

total_string = "var TEMPLATES = {#{total_strings.join(",")}};"
File.open("public/tmp/" + dir + ".js", "w+").write(total_string)
