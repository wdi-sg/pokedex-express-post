 <form method="POST" action="/pokemon/0?_method=PUT">
                            Id:<input type="number" name="id" value={pokemon["id"]}>
                            Num:<input type="text" name="num" value={pokemon["num"]}>
                             Name: <input type="text" name="name" value={pokemon["name"]}>
                             Image: <input type="text" name="img" value={pokemon["img"]}>
                             Height: <input type="text" name="height" value={pokemon["height"]}>
                             Weight: <input type="text" name="weight" value={pokemon["weight"]}>
                            <input type="submit" value="Submit">
</form>