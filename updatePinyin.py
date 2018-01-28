#!usr/bin/python3

import sqlite3
from itertools import chain
from pypinyin import pinyin


def selectAll(conn,table):
    sql = '''
    select * from words
    '''
    cur = conn.cursor()
    cur.execute(sql)
    return cur.fetchall()

def update(conn, word):
    sql = '''update words
        set words.pinyin = '?'
        where id = ?'''

    updated_pinyin = ' '.join(chain.from_iterable(pinyin(word[1])))
    cur = conn.cursor()
    #cur.execute("update words set pinyin=? where id = ?", ( updated_pinyin, int(word[0]) ))
    #cur.execute(sql, (updated_pinyin, int(word[0])))


def main():
    conn = sqlite3.connect('./db/my_words.db')
    with conn:
        words = selectAll(conn,'words')
        for word in words:
            print(word)
            update(conn,word)



if(__name__=="__main__"):
    main()
