total_jses = {}
temp_js = ""
file_name = nil
File.open("manifesto").each_line do |x|
  if x =~ /@/
    temp_js = ""
    file_name = x[1..-1].strip
    total_jses[file_name] = ""
  elsif x.strip != ""
    total_jses[file_name] += "\n" + File.open(x.strip).read
  end
end

total_jses.each_pair do |k, v|
  code = "(function() {" + v + "})();"
  File.open("./public/js/" + k || "/public/js/app.js", "w").write(code)
end
