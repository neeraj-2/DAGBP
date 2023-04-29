from flask import Flask

app = Flask(__name__)

# Import final.py script

@app.route('/run-script')
def run_script():
    print ("Hello")
    # import final.py script
    import final
    # run finsl.py script
    final.main()
   

    # Return a message to the client
    return "The script has been executed successfully!"

if __name__ == '__main__':
    app.run(debug=True)
