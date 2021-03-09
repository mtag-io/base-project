from config import ACTIONS
from constants import OK, CRAWL_DEFAULTS


def events(sio, executor):
    @sio.event
    async def server(sid, payload):

        try:
            if payload['action'] == ACTIONS.OVERLAY:
                token = payload.get('token', sid)
                corner = int(payload['corner'])

                out = executor.overlay_widget(token, corner)
                await sio.emit('worker', out)

            if payload['action'] == ACTIONS.CRAWL:
                token = payload.get('token', sid)
                data = payload.get('data', CRAWL_DEFAULTS)
                out = executor.overlay_text(token, data)
                await sio.emit('worker', out)

            # payload:
            # action: 'SOURCE_PROBE'
            # source: name of source
            # widget: True/False if it's a source or widget
            # token: userId or sid
            if payload['action'] == ACTIONS.RESOLVE_SOURCE:
                ok = await executor.probe_source(payload)
                await sio.emit('worker', ok)

            if payload['action'] == ACTIONS.CHECK_LINK:
                print('Handshake OK')
                await sio.emit('worker', {"status": OK})

        except Exception as err:
            print(err)
            await sio.emit('worker', {"error": True, "message": str(err)})
