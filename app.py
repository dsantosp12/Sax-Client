from flask import Flask, render_template

app = Flask(__name__, static_url_path='/static')


@app.route('/')
@app.route('/summary')
def summary():
    return render_template("summary.html", title="Summary")


@app.route('/devices')
def devices():
    return render_template("devices.html", title="Devices")


@app.route('/device/<int:device_id>')
def device(device_id):
    return render_template("device_details.html", title="Devices",
                           device_id=device_id)
