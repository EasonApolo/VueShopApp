<?php
header('Access-Control-Allow-Origin:*');

header('Content-type:text/json');

$json='[{"type":"shop","name":"店铺名长长长长长长长长长长长长","imgUrl":"https://dummyimage.com/337x337/c1b1b8/7137d1","assess":[3,5,4.4],"shopUrl":"dianpuURL"},{"type":"shop","name":"店铺名长长","imgUrl":"https://dummyimage.com/272x272/7b30e/a788b","assess":[3.5,4.3,2.1],"shopUrl":"dianpuURL"},{"type":"shop","name":"水果手机专卖店","imgUrl":"https://dummyimage.com/292x292/612eb7/bdeec9","assess":[5,4.6,3.9],"shopUrl":"dianpuURL"},{"type":"item","name":"商品名长长长长长长长长长长长长","imgUrl":"https://dummyimage.com/221x221/4da67e/26ef6","price":6.66,"itemUrl":"dianpuURL","volume":5,"discount":10},{"type":"item","name":"商品名长长","imgUrl":"https://dummyimage.com/567x567/d65016/143ea8","price":23.33,"itemUrl":"dianpuURL","volume":780,"discount":10},{"type":"item","name":"商品名长","imgUrl":"/static/img/S.6a35046.png","price":8088,"itemUrl":"dianpuURL","volume":123102,"discount":10}]';

echo $json;

?>
