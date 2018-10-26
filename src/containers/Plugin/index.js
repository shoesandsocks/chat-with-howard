import React from 'react';
import styled from 'styled-components';

import { darkBlue, orange } from '../../utils/palette';
import ss from './hc wp plugin ss.png';

const pastedCode = `
<?php
/**
* @package Howard_Chicken
* @version 1.0
*/
/*
Plugin Name: Howard Chicken
Plugin URI: http://howardchicken.herokuapp.com/plugin
Description: A modification of the Hello Dolly plugin featuring content
from the Back to Work podcast. Show material artisanally harvested by
Matt Keller. Subscribe to the show at http://5by5.tv/b2w/
Author: RL Brown
Version: 1.0
Author URI: https://www.pineandvine.com
*/

function howard_chicken_get_quote() {
  $url = 'https://hc-api.online/howard';
  $response = wp_safe_remote_post(  $url, $args = array(
    'method'      => 'POST',
    'timeout'     => 45,
    'redirection' => 5,
    'httpversion' => '1.0',
    'blocking'    => true,
    'headers'     => array(),
    'body'        => array(
        'kind' => 3,
        'argument' => 1
    ),
    'cookies'     => array()
    )
  );
  if ( is_wp_error( $response ) ) {
    $error_message = $response->get_error_message();
    echo "Something went wrong: $error_message";
} else {
    $api_response = json_decode( wp_remote_retrieve_body( $response ), true );
    return $api_response['response'][0]['text'];
  }
}

// This just echoes the chosen line, we'll position it later
function howard_chicken() {
  $chosen = howard_chicken_get_quote();
  echo "<p id='howard'>🐔 $chosen 🐔</p>";
}

// Now we set that function up to execute when the admin_notices action is called
add_action( 'admin_notices', 'howard_chicken' );

// We need some CSS to position the paragraph
function howard_css() {
  // This makes sure that the positioning is also good for right-to-left languages
  $x = is_rtl() ? 'left' : 'right';

  echo "
  <style type='text/css'>
  #howard {
    float: $x;
    padding-$x: 15px;
    padding-top: 5px;
    margin: 0;
    font-size: 15px;
  }
  </style>
  ";
}

add_action( 'admin_head', 'howard_css' );
?>
`;
const PluginWrap = styled.div`
  /* height: 92vh; */
  padding-top: 4em;
  background: ${darkBlue};
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s;
`;

const Text = styled.p`
  color: white;
  font-family: 'Inconsolata', sans-serif;
  font-size: 1.25em;
  margin: 0;
  max-width: 600px;
  padding: 2rem 0 4rem;
`;
const Pre = styled.pre`
  width: 800px;
  color: white;
  & code {
    max-width: 800px;
  }
  border: 2px solid white;
`;

const Big = styled.a`
  color: white;
  font-family: 'Inconsolata', sans-serif;
  margin: 1em 0 0 0;
  font-size: 2em;
  text-decoration-color: ${orange};
  transition: all 0.25s;
  &:hover {
    color: ${orange};
  }
`;

const Plugin = () => (
  <PluginWrap>
    <Big>Howard - the WordPress plugin</Big>
    <Text>
      If you&apos;ve used Wordpress and are familiar with the built-in
      Hello Dolly plugin, you&apos;ll have some idea of what the Howard Chicken
      Wordpress plugin does.
    </Text>
    <img src={ss} alt="decoration" />
    <Text>
      At the moment the plugin is still unpublished, but you can build it yourself.
      In your active WordPress theme, go to the /plugins subfolder and make a new folder
      called `howard-chicken`. In that subfolder, create a text file called
      `howard-chicken.php`. Paste the following into that .php file:
    </Text>
    <Pre>
      <code>
        {pastedCode}
      </code>
    </Pre>
    <Text>
      That&apos;s it! You might need a README.txt in that subfolder too but that&apos;s easy.
      In your Dashboard, you should have a new plugin available...
    </Text>
  </PluginWrap>
);

export default Plugin;
