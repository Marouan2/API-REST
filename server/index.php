<?php

require_once 'NotORM.php';

$pdo = new PDO('mysql:dbname=hébergement;host=localhost', 'root', '');
$db = new NotORM($pdo);

require_once 'Slim/Slim.php';

/*
 * Creating new Slim application
 */
$app = new Slim();

$app->get('/hotel(/:id)', function ($id = null) use ($app, $db) {
    if (null === $id) {
        $cityId = $app->request()->get('city');
        $data = array();
        foreach ($db->hotel()->where('city_id', $cityId) as $hotel) {
            $data[] = array(
                'id' =>            $hotel['id'],
                'hotel' =>         $hotel['hotel'],
                'city_id' =>       $hotel['city_id'],
				'address' =>       $hotel['address'],
                'description' =>   $hotel['description']
            );
        }        
    } else {
        $data = null;
        if ($hotel = $db->hotel()->where('id', $id)->fetch()) {
            $data = array(
                'id' =>            $hotel['id'],
                'hotel' =>         $hotel['hotel'],
                'city_id' =>       $hotel['city_id'],
				'address' =>       $hotel['address'],
                'description' =>   $hotel['description']
            );
        }
    }
    
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});



$app->post('/hotel', function () use ($app, $db) {
    $hotel = (array) json_decode($app->request()->getBody());
    $data = $db->hotel()->insert($hotel);
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode((array)$data->getIterator());
});


$app->put('/hotel/:id', function ($id) use ($app, $db) {
    $hotel = $db->hotel()->where('id', $id);
    $data = null;

    if ($hotel->fetch()) {
        $post = (array) json_decode($app->request()->getBody());
        $data = $hotel->update($post);
    }
    
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});
$app->delete('/hotel/:id', function ($id) use ($app, $db) {
    $hotel = $db->hotel()->where('id', $id);
    $data = null;
    if ($hotel->fetch()) {
        $data = $hotel->delete();
    }
    
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});



$app->get('/city(/:id)', function ($id = null) use ($app, $db) {
    
    if (null === $id) { 
        $data = array();
        
        foreach ($db->city() as $city) {
            $data[] = array(
                'id' =>               $city['id'],
                'name' =>             $city['name']
            );
        }
       
    } else {
        $data = null;

        if ($city = $db->city()->where('id', $id)->fetch()) {
            $data = array(
                'id' =>               $city['id'],
                'name' =>             $city['name']
            );
        }
    }
    
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});


$app->post('/city', function () use ($app, $db) {
    
    $city = (array) json_decode($app->request()->getBody());
    
    $data = $db->city()->insert($city);

    $app->response()->header('Content-Type', 'application/json');
    echo json_encode((array)$data->getIterator());
});


$app->put('/city/:id', function ($id) use ($app, $db) {
    
    $city = $db->city()->where('id', $id);
    $data = null;

    if ($city->fetch()) {
        
        $post = (array) json_decode($app->request()->getBody());
        $data = $city->update($post);
    }
    
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode((array)$data->getIterator());
});


$app->delete('/city/:id', function ($id) use ($app, $db) {
    foreach ($db->hotel()->where('city_id', $id) as $hotel) {
        $hotel->delete();
    }
    
    $city = $db->city()->where('id', $id);

    $data = null;
    if ($city->fetch()) {
        $data = $city->delete();
    }
    
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});

/*
 * Runing the Slim app
 */
$app->run();