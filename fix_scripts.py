import glob
import re

for filepath in glob.glob('/home/sonu007/software/Smashyy/*.html'):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the broken nested script
    p1 = r'(?P<space>[ \t]*)<script src="js/main\.js"></script>\s*</script>'
    def repl(m):
        return f"</script>\n{m.group('space')}<script src=\"js/main.js\"></script>"
        
    new_content = re.sub(p1, repl, content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print("Fixed:", filepath)

