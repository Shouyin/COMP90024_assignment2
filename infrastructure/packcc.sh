#!bash
REMOTE_PACKS="ansible/remote_packs"

CCPATH="cc/"
CC="arcc.zip"

zip -r $CC $CCPATH

mv "./$CC" "../$REMOTE_PACKS/$CC"