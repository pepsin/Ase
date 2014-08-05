build:
	@ruby ./tools/compile_tpl.rb templates
	@ruby ./tools/merge_js.rb
	@ruby ./tools/compile_html.rb
	@ruby ./tools/compile_css.rb
	@ruby ./tools/copy_img.rb
