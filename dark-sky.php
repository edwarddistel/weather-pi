<?php

class Forecast
{
    const API_ENDPOINT = 'https://api.darksky.net/forecast/';
    private $api_key;
    public function __construct($api_key)
    {
        $this->api_key = $api_key;
    }
    private function request($latitude, $longitude, $time = null, $options = array())
    {
        $request_url = self::API_ENDPOINT
            . $this->api_key
            . '/'
            . $latitude
            . ','
            . $longitude
            . ((is_null($time)) ? '' : ','. $time);
        if (!empty($options)) {
            $request_url .= '?'. http_build_query($options);
        }
        
        $response = json_decode(file_get_contents($request_url));
        $response->headers = $http_response_header;
        return $response;
    }
    public function get($latitude, $longitude, $time = null, $options = array())
    {
        return $this->request($latitude, $longitude, $time, $options);
    }
}

// Add your API key here
$forecast = new Forecast("YOUR API KEY HERE");

// Set timezone
date_default_timezone_set('America/New_York');
$date = new DateTime();

// Get the forecast at a given time - default coordinates Times Square
$data = json_encode($forecast->get('40.758377, -73.985597'));
echo header("Access-Control-Allow-Origin: *");
echo $data;


?>