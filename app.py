from flask import Flask, render_template

app = Flask(__name__, static_url_path='/static')


@app.route('/')
@app.route('/summary')
def summary():
    return render_template("summary.html", title="Summary")


@app.route('/devices')
def devices():
    return render_template("devices.html", title="Devices")


@app.route('/device/<int:id>')
def device(id):
    return
